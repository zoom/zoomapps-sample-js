import express from 'express';
import session from 'express-session';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import logger from 'morgan';
import { URL } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';

import db from './server/db.js';
import { startHTTP } from './server/server.js';

import indexRoutes from './server/routes/index.js';
import authRoutes from './server/routes/auth.js';

/* Environment Config */
const dbg = debug('hello-zoom:app');

dotenv.config();
const port = process.env.PORT || '3000';
const deps = [
    'ZM_HOST',
    'ZM_API',
    'ZM_CLIENT_ID',
    'ZM_CLIENT_SECRET',
    'ZM_REDIRECT_URI',
    'SESSION_SECRET',
    'MONGO_USER',
    'MONGO_PASSWORD',
    'MONGOOSE_KEY',
    'MONGOOSE_SECRET',
];

deps.forEach((str) => {
    const dep = process.env[str];
    if (!dep || typeof dep !== 'string') {
        console.error(`${str} is required - check the .env file`);
        process.exit(1);
    }
});

/* App Config */
const app = express();
app.set('port', port);

// log Axios requests outside of production
const dbgAx = debug('hello-zoom:axios');
const logFunc = (r) => {
    if (process.env.NODE_ENV !== 'production') {
        let { method, status, url, config } = r;

        url = url || config?.url;

        let str = url;

        if (method) str = `${method.toUpperCase()} ${str}`;
        if (status) str = `${status} ${str}`;

        dbgAx(str);
    }

    return r;
};

axios.interceptors.request.use(logFunc);
axios.interceptors.response.use(logFunc);

/*  Middleware */
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev', { stream: { write: (msg) => dbg(msg) } }));
app.use(express.static(new URL('public', import.meta.url).pathname));

/* Routing */
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// redirect users to the home page if they get a 404 route
app.get('*', (req, res) => res.redirect('/'));

// Connect MongoDB, Create Store and Start HTTP Server
db.connect('mongodb://mongo:27017')
    .then(() => {
        const sess = session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                path: '/',
                httpOnly: true,
                maxAge: 365 * 24 * 60 * 60 * 1000,
            },
            store: db.createStore(),
        });

        app.use(sess);

        return startHTTP(app, port);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

export default app;
