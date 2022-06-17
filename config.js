import { URL } from 'url';

if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}

const config = process.env;
const deps = [
    'ZM_CLIENT_ID',
    'ZM_CLIENT_SECRET',
    'ZM_REDIRECT_URL',
    'SESSION_SECRET',
];

// Check that we have all our config dependencies
let hasMissing = !config;
for (const dep in deps) {
    const conf = deps[dep];
    const str = config[conf];

    if (!str || typeof str !== 'string') {
        console.error(`${conf} is required`);
        hasMissing = true;
    }
}

if (hasMissing) throw new Error('Missing required .env values...exiting');

try {
    new URL(config.ZM_REDIRECT_URL);
} catch (e) {
    throw new Error(`Invalid ZM_REDIRECT_URL: ${e.message}`);
}

export const zoomApp = {
    host: config.ZM_HOST || 'https://zoom.us',
    clientId: config.ZM_CLIENT_ID,
    clientSecret: config.ZM_CLIENT_SECRET,
    redirectUrl: config.ZM_REDIRECT_URL,
    sessionSecret: config.SESSION_SECRET,
};

// Zoom App Info
export const appName = config.APP_NAME || 'zoom-app';
export const redirectUri = zoomApp.redirectUrl;

// HTTP
export const port = config.PORT || '3000';

// require secrets are explicitly imported
export default {
    appName,
    redirectUri,
    port,
};
