import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import logger from 'morgan';
import { URL } from 'url';

import indexRoutes from './server/routes/index.js';
import authRoutes from './server/routes/auth.js';

/* Configuration */
const dbg = debug('hello-zoom:app');
const app = express();

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

export default app;
