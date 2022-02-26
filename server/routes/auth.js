import express from 'express';
import { query } from 'express-validator';

import { handleError, sanitize } from '../helpers/routing.js';
import { getToken } from '../helpers/auth.js';
import { getDeepLink, getZoomUser } from '../helpers/zoom-api.js';

import Auth from '../models/auth.js';
import User from '../models/user.js';

const router = express.Router();

// Validate the Authorization Code sent from Zoom
const validateQuery = [
    query('code')
        .isString()
        .withMessage('code must be a string')
        .isLength({ min: 32, max: 64 })
        .withMessage('code must be > 32 and < 64 chars')
        .escape(),
    query('state')
        .optional()
        .isString()
        .withMessage('state must be a string')
        .isLength({ max: 1024 })
        .withMessage('state must be < 1024 chars')
        .escape(),
];

/*
 * Redirect URI - Zoom App Launch handler
 * The user is redirected to this route when they authorize your app
 */
router.get('/', validateQuery, async (req, res, next) => {
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
        const auth = Auth.create({
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
        const deepLink = await getDeepLink(accessToken);

        res.redirect(deepLink);
    } catch (e) {
        next(handleError(e));
    }
});

export default router;
