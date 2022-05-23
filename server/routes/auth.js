import express from 'express';
import { query } from 'express-validator';

import { handleError, sanitize } from '../helpers/routing.js';
import { getDeeplink, getToken } from '../helpers/zoom-api.js';

import session from '../session.js';

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
    try {
        req.session.state = req.query?.state;

        // sanitize code and state query parameters
        await sanitize(req);

        // get Access Token from Zoom
        const { access_token: accessToken } = await getToken(req.query.code);

        // fetch deeplink from Zoom API
        const deeplink = await getDeeplink(accessToken);

        // redirect the user to the Zoom Client
        res.redirect(deeplink);
    } catch (e) {
        req.session.state = null;
        next(handleError(e));
    }
    req.session.state = null;
});

export default router;
