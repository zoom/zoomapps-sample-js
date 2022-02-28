import express from 'express';
import session from 'express-session';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import logger from 'morgan';
import { URL } from 'url';
import axios from 'axios';
import helmet from 'helmet';
import db from './server/db.js';
import { startHTTP } from './server/server.js';

import indexRoutes from './server/routes/index.js';
import authRoutes from './server/routes/auth.js';

import { mongoURL, port, sessionSecret } from './config.js';

/* App Config */
const dbg = debug(`hello-zoom:ap`);

const app = express();
app.set('port', port);

// log Axios requests and responses
const logFunc = (r) => {
    if (process.env.NODE_ENV !== 'production') {
        let { method, status, url, config } = r;

        url = url || config?.url;

        let str = url;

        if (method) str = `${method.toUpperCase()} ${str}`;
        if (status) str = `${status} ${str}`;

        debug(`hello-zoom:axios`)(str);
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

app.use(
    helmet({
        frameguard: {
            action: 'sameorigin',
        },
        hsts: {
            maxAge: 31536000,
        },
        referrerPolicy: 'sameorigin',
        contentSecurityPolicy: {
            directives: {
                'default-src': '*',
                'style-src': 'self',
                'script-src': 'self',
                'connect-src': 'self',
                'img-src': 'self',
                'base-uri': 'self',
                'form-action': 'self',
            },
        },
    })
);

/* Routing */
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// redirect users to the home page if they get a 404 route
app.get('*', (req, res) => res.redirect('/'));

// Connect MongoDB, Create Store and Start HTTP Server
db.connect(mongoURL)
    .then(() => {
        const sess = session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: true,
            cookie: {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 365 * 24 * 60 * 60 * 1000,
            },
            store: db.createStore(),
        });

        app.use(sess);

        return startHTTP(app, port);
    })
    .catch(async (e) => {
        console.error(e);
        await db.disconnect();
        process.exit(1);
    });

export default app;
