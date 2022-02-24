import express from 'express';
import { header } from 'express-validator';
import { handleError, sanitize } from '../helpers/routing.js';
import { getAppContext, contextHeader } from '../helpers/cipher.js';

const router = express.Router();

const validateHeader = header(contextHeader)
    .isBase64()
    .withMessage(`${contextHeader} header must be a base64 string`)
    .isLength({ min: 128, max: 512 })
    .withMessage(`${contextHeader} header is required`)
    .escape();

/*
 * Home Page - Zoom App Launch handler
 * this route is used when a user navigates to the deep link
 */
router.get('/', validateHeader, async (req, res) => {
    try {
        await sanitize(req);

        const header = req.header(contextHeader).toString();

        // eslint-disable-next-line no-unused-vars
        const ctx = getAppContext(header);

        res.render('index');
    } catch (e) {
        handleError(e);
    }
});

export default router;
