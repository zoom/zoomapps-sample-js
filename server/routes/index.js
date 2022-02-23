import express from 'express';
import { header } from 'express-validator';
import { handleError, sanitize } from '../helpers/routing.js';
import { decryptCtx } from '../helpers/auth.js';

const router = express.Router();

const ctxHeader = 'x-zoom-app-context';
const validateHeader = header(ctxHeader)
    .isString()
    .isBase64()
    .isLength({ min: 128, max: 512 })
    .withMessage(`${ctxHeader} header is required`);

/*
 * Home Page - Zoom App Launch handler
 * this route is used when a user navigates to the deep link
 */
router.get('/', validateHeader, async (req, res) => {
    try {
        await sanitize(req);

        const ctx = decryptCtx(
            req.header(ctxHeader),
            process.env.ZM_CLIENT_SECRET
        );

        console.log(ctx);

        res.render('index');
    } catch (e) {
        handleError(e);
    }
});

export default router;
