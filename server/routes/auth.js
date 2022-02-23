import express from 'express';
import { query } from 'express-validator';

import { sanitize, handleError } from '../helpers/routing.js';

const router = express.Router();

// Validate the Authorization Code sent from Zoom
const validateCode = query('code')
    .isAlphanumeric()
    .withMessage('code must be alphanumeric')
    .isLength({ min: 32, max: 64 })
    .withMessage('code must be > 32 and < 64 chars');

/*
 * Redirect URI - Zoom App Launch handler
 * The user is redirected to this route when they authorize your app
 */
router.get('/', validateCode, async (req, res, next) => {
    try {
        await sanitize(req);

        res.render('index');
    } catch (e) {
        next(handleError(e));
    }
});

export default router;
