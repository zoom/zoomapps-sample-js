import express from 'express';
import { header } from 'express-validator';
import { handleError, sanitize } from '../helpers/routing.js';
import { contextHeader, getAppContext } from '../helpers/cipher.js';
import { getInstallURL } from '../helpers/zoom-api.js';
import debug from 'debug';

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

        debug('router')('header', header);

        if (!header) {
            const e = new Error(`Header ${contextHeader} is missing`);
            e.code = 400;
            return handleError(e);
        }

        // eslint-disable-next-line no-unused-vars
        const ctx = getAppContext(header);

        req.session.user = ctx?.uid;
        req.session.meetingUUID = ctx?.mid;

        res.sendFile('index.html');
    } catch (e) {
        handleError(e);
    }
});

/*
 * Install Route - Install the Zoom App from the Zoom Marketplace
 * this route is used when a user installs the app from the Zoom Client
 */
router.get('/install', validateHeader, async (req, res) =>
    res.redirect(getInstallURL())
);

export default router;
