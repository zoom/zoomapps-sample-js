import axios from 'axios';
import createError from 'http-errors';

/**
 * getToken obtains an OAuth access token from Zoom
 * @param {String} code - authorization code from user authorization
 * @param {String} [id=''] - Client ID for the Zoom OAuth App
 * @param {String} [secret=''] - Client Secret for Zoom OAuth App
 * @return {Promise}  Promise resolving to the access token object
 */
export async function getToken(code, id = '', secret = '') {
    if (!code || typeof code !== 'string')
        throw createError(500, 'authorization code must be a valid string');

    const username = id || process.env.ZM_CLIENT_ID;
    const password = secret || process.env.ZM_CLIENT_SECRET;
    const zoom = process.env.ZM_HOST;

    const data = new URLSearchParams({
        code,
        redirect_uri: process.env.ZM_REDIRECT_URI,
        grant_type: 'authorization_code',
    }).toString();

    return axios
        .post(`${zoom}/oauth/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username,
                password,
            },
        })
        .then(({ data }) => Promise.resolve(data));
}

export const zoomAppId = process.env.ZM_CLIENT_ID;
export const redirectUri = process.env.ZM_REDIRECT_URI;

const auth = {
    zoomAppId,
    redirectUri,
    getToken,
};

export default auth;
