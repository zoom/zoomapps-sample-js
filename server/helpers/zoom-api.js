import axios from 'axios';
import { URL } from 'url';
import { zoomApp } from '../../config.js';
import createError from 'http-errors';

// Get Zoom API URL from Zoom Host value
const host = new URL(zoomApp.host);
host.hostname = host.hostname.replace(/^/, 'api.');

const baseURL = host.href;

/**
 * Get the authorization header for the Zoom API
 * @param token
 * @return {String} Zoom API authorization header
 */
export function getAuthHeader(token) {
    return `Bearer ${token}`;
}

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

    const data = new URLSearchParams({
        code,
        redirect_uri: zoomApp.redirectUri,
        grant_type: 'authorization_code',
    }).toString();

    return axios({
        data,
        baseURL: zoomApp.host,
        url: '/oauth/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username,
            password,
        },
    }).then(({ data }) => Promise.resolve(data));
}

/**
 * Use the Zoom API to get a Zoom User
 * @param uid - User ID to query on
 * @param token Zoom App Access Token
 */
export function getZoomUser(uid, token) {
    return axios({
        baseURL,
        url: `/v2/users/${uid}`,
        headers: {
            Authorization: getAuthHeader(token),
        },
    }).then(({ data }) => Promise.resolve(data));
}

/**
 * Return the DeepLink for opening Zoom
 * @param {string} token - Zoom App Access Token
 * @return {Promise}
 */
export function getDeepLink(token) {
    return axios({
        baseURL,
        url: '/v2/zoomapp/deeplink',
        method: 'POST',
        headers: {
            Authorization: getAuthHeader(token),
        },
        data: {
            action: JSON.stringify({
                url: '/',
                role_name: 'Owner',
                verified: 1,
                role_id: 0,
            }),
        },
    }).then(({ data }) => Promise.resolve(data.deeplink));
}
