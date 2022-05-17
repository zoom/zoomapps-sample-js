import express from 'express';
import { header } from 'express-validator';
import { handleError, sanitize } from '../helpers/routing.js';
import { contextHeader, getAppContext } from '../helpers/cipher.js';
import { getInstallURL } from '../helpers/zoom-api.js';
import session from '../session';

const router = express.Router();

const headerMax = 512;

const validateHeader = header(contextHeader)
    .isString()
    .withMessage(`${contextHeader} header must be a base64 string`)
    .isLength({ max: headerMax })
    .withMessage(`${contextHeader} header must be < ${headerMax} chars`)
    .optional()
    .escape();

/*
 * Home Page - Zoom App Launch handler
 * this route is used when a user navigates to the deep link
 */
router.get('/', validateHeader, async (req, res, next) => {
    try {
        await sanitize(req);

        const header = req.header(contextHeader);

        let name = 'Browser';
        let isZoom = false;

        if (header) {
            const ctx = getAppContext(header);

            req.session.user = ctx.uid;
            req.session.meetingUUID = ctx.mid;

            isZoom = true;
            name = 'Zoom';
        }

        return res.render('index', {
            isZoom,
            title: `Hello ${name}`,
            nonce: res.locals.cspNonce,
            installURL: getInstallURL(),
        });
    } catch (e) {
        next(handleError(e));
    }
});

/*
 * Install Route - Install the Zoom App from the Zoom Marketplace
 * this route is used when a user installs the app from the Zoom Client
 */
router.get('/install', session, async (req, res) => {
    const url = getInstallURL();
    const state = url.searchParams.get('state');
    req.session.state = state;
    res.redirect(url.toString());
});

export default router;
