import express from 'express';
import { query } from 'express-validator';

import { handleError, sanitize } from '../helpers/routing.js';
import { getDeeplink, getToken, getZoomUser } from '../helpers/zoom-api.js';

import Auth from '../models/auth.js';
import User from '../models/user.js';

import session from '../session';

const router = express.Router();

const codeMin = 32;
const codeMax = 64;

// Validate the Authorization Code sent from Zoom
const validateQuery = [
    query('code')
        .isString()
        .withMessage('code must be a string')
        .isLength({ min: codeMin, max: codeMax })
        .withMessage(`code must be > ${codeMin} and < ${codeMax} chars`)
        .escape(),
    query('state')
        .isString()
        .withMessage('state must be a string')
        .custom((value, { req }) => value === req.session.state)
        .withMessage('invalid state parameter')
        .escape(),
];

/*
 * Redirect URI - Zoom App Launch handler
 * The user is redirected to this route when they authorize your app
 */
router.get('/', session, validateQuery, async (req, res, next) => {
    req.session = null;
    try {
        // sanitize code and state query parameters
        await sanitize(req);

        // get Access Token from Zoom
        const {
            scope,
            expires_in,
            access_token: accessToken,
            refresh_token: refreshToken,
        } = await getToken(req.query.code);

        // create a new Auth object for this user
        const auth = await Auth.create({
            scope,
            accessToken,
            refreshToken,
            expiresAt: Date.now() + expires_in * 1000,
        });

        // get the ID of this user
        const { id } = await getZoomUser('me', accessToken);

        // create a new user if one doesn't exist
        await User.updateOne({ id }, { id, auth }, { upsert: true });

        // fetch deeplink from Zoom API
        const deeplink = await getDeeplink(accessToken);

        // redirect the user to the Zoom Client
        res.redirect(deeplink);
    } catch (e) {
        next(handleError(e));
    }
});

export default router;
