import axios from 'axios';
import createError from 'http-errors';
import { zoomApp } from '../../config.js';
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

    const username = id || zoomApp.clientId;
    const password = secret || zoomApp.clientSecret;
    const zoom = zoomApp.host;

    const data = new URLSearchParams({
        code,
        redirect_uri: zoomApp.redirectUri,
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

export default getToken;
