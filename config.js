import dotenv from 'dotenv';
import fs from 'fs';
import dotenvExpand from 'dotenv-expand';

const deps = [
    'ZM_CLIENT_ID',
    'ZM_CLIENT_SECRET',
    'ZM_REDIRECT_URL',
    'ZM_HOST',
    'SESSION_SECRET',
    'MONGO_USER',
    'MONGO_PASS',
    'MONGO_URL',
    'MONGO_KEY',
    'MONGO_SIGN',
];

// Read .env directly to avoid adding secrets to process.env
const fileName = '.env';
const filePath = new URL(fileName, import.meta.url).pathname;

if (!fs.existsSync(filePath))
    throw new Error(`config file ${filePath} does not exist`);

let buffer;
try {
    buffer = fs.readFileSync(filePath);
} catch (e) {
    throw new Error(`Failed to read config: ${e.message}`);
}

// Replace MongoDB connection string templates
const config = dotenvExpand.expand({
    ignoreProcessEnv: true,
    parsed: dotenv.parse(buffer),
}).parsed;

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

if (hasMissing) {
    console.error('Missing required .env values...exiting');
    process.exit(1);
}

const p = config.PORT || process.env.PORT;

export const zoomApp = {
    name: config.APP_NAME || 'zoom-app',
    host: config.ZM_HOST,
    clientId: config.ZM_CLIENT_ID,
    clientSecret: config.ZM_CLIENT_SECRET,
    redirectUri: config.ZM_REDIRECT_URL,
};

// Zoom App Info
export const appName = zoomApp.name;
export const redirectUri = zoomApp.redirectUri;

// MongoDB Session
export const sessionSecret = config.SESSION_SECRET;

// MongoDB and Mongoose
export const mongoURL = config.MONGO_URL;
export const encryptionKey = config.MONGO_KEY;
export const signingKey = config.MONGO_SIGN;

// HTTP
export const port = p || '3000';

// require secrets are explicitly imported
export default {
    appName,
    redirectUri,
    port,
    mongoURL,
};
