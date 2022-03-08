import express from 'express';
import axios from 'axios';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import db from './server/db.js';
import debug from 'debug';
import helmet, { contentSecurityPolicy } from 'helmet';
import logger from 'morgan';
import session from 'express-session';
import createError from 'http-errors';
import { URL } from 'url';

import { startHTTP } from './server/server.js';
import indexRoutes from './server/routes/index.js';
import authRoutes from './server/routes/auth.js';

import {
    appName,
    mongoURL,
    port,
    redirectUri,
    sessionSecret,
} from './config.js';

const dirname = (path) => new URL(path, import.meta.url).pathname;

// connect to MongoDB
await db.connect(mongoURL);

/* App Config */
const app = express();
const dbg = debug(`${appName}:app`);

// CSP directives
const redirectOrigin = new URL(redirectUri).origin;

// views and assets
const publicDir = dirname('public');
const viewDir = dirname('server/views');

app.set('view engine', 'pug');
app.set('views', viewDir);
app.locals.basedir = publicDir;

// HTTP
app.set('port', port);

// log Axios requests and responses
const logFunc = (r) => {
    if (process.env.NODE_ENV !== 'production') {
        let { method, status, url, baseURL, config } = r;

        const endp = url || config?.url;
        const base = baseURL || config?.baseURL;
        let str = new URL(endp, base).href;

        if (method) str = `${method.toUpperCase()} ${str}`;
        if (status) str = `${status} ${str}`;

        debug(`${appName}:axios`)(str);
    }

    return r;
};

axios.interceptors.request.use(logFunc);
axios.interceptors.response.use(logFunc);

/*  Middleware */

// generate a nonce for inlining scripts and styles
app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
    next();
});

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
            ...contentSecurityPolicy.getDefaultDirectives(),
            directives: {
                'default-src': 'self',
                styleSrc: [
                    "'self'",
                    (req, res) => `'nonce-${res.locals.cspNonce}'`,
                ],
                scriptSrc: [
                    "'self'",
                    (req, res) => `'nonce-${res.locals.cspNonce}'`,
                ],
                imgSrc: ["'self'", redirectOrigin],
                'connect-src': 'self',
                'base-uri': 'self',
                'form-action': 'self',
            },
        },
    })
);

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev', { stream: { write: (msg) => dbg(msg) } }));
app.use(express.static(publicDir));

app.use(
    session({
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
    })
);

/* Routing */
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const title = `Error ${err.status}`;

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (res.locals.error) dbg(`${title} %s`, err.stack);

    // render the error page
    res.status(status);
    res.render('error');
});

// redirect users to the home page if they get a 404 route
app.get('*', (req, res) => res.redirect('/'));

// start serving
startHTTP(app, port).catch(async (e) => {
    console.error(e);
    await db.disconnect();
    process.exit(1);
});

export default app;
