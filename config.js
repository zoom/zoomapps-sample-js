import dotenv from 'dotenv';
import fs from 'fs';
import * as dotenvExpand from 'dotenv-expand';

// Read .env directly to avoid adding secrets to the environment
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

// Check that we have all our configs
let hasMissing = !config;
for (const prop in config) {
    const dep = config[prop];
    const missing = !dep || typeof dep !== 'string';

    if (missing) {
        console.error(`${prop} is required`);
        hasMissing = true;
    }
}

if (hasMissing) {
    console.error('Missing required .env values...exiting');
    process.exit(1);
}

const p = config.PORT || process.env.PORT;

export const zoomApp = {
    host: config.ZM_HOST,
    clientId: config.ZM_CLIENT_ID,
    clientSecret: config.ZM_CLIENT_SECRET,
    redirectUri: config.ZM_REDIRECT_URI,
};

export const sessionSecret = config.SESSION_SECRET;

export const mongoURL = config.MONGO_URL;
export const encryptionKey = config.MONGO_KEY;
export const signingKey = config.MONGO_SIGN;

export const port = p || '3000';

export default {
    port,
    zoomApp,
    mongoURL,
    signingKey,
    encryptionKey,
};
