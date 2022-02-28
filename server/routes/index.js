import express from 'express';
import { header } from 'express-validator';
import { handleError, sanitize } from '../helpers/routing.js';
import { contextHeader, getAppContext } from '../helpers/cipher.js';

const router = express.Router();

const headerMin = 128;
const headerMax = 512;

const validateHeader = header(contextHeader)
    .isBase64()
    .withMessage(`${contextHeader} header must be a base64 string`)
    .isLength({ min: headerMin, max: headerMax })
    .withMessage(
        `${contextHeader} header must be > ${headerMin} and < ${headerMax} chars`
    )
    .escape();

/*
 * Home Page - Zoom App Launch handler
 * this route is used when a user navigates to the deep link
 */
router.get('/', validateHeader, async (req, res) => {
    try {
        await sanitize(req);

        const header = req.header(contextHeader);

        // eslint-disable-next-line no-unused-vars
        const ctx = getAppContext(header);

        res.render('index');
    } catch (e) {
        handleError(e);
    }
});

export default router;
