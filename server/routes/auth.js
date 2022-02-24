import express from 'express';
import { query } from 'express-validator';

import { handleError, sanitize } from '../helpers/routing.js';
import { getToken } from '../helpers/auth.js';

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
        await sanitize(req);

        // eslint-disable-next-line no-unused-vars
        const token = await getToken(req.query.code);

        res.sendStatus(200);
    } catch (e) {
        next(handleError(e));
    }
});

export default router;
