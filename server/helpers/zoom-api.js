import axios from 'axios';

// Get Zoom API URL from Zoom Host value
const host = new URL(process.env.ZM_HOST);
host.hostname = host.hostname.replace(/^/, 'api.');

const baseURL = `${host.href}/v2`;

function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

/**
 * Use the Zoom API to get a Zoom User
 * @param uid - User ID to query on
 * @param token Zoom App Access Token
 */
export function getZoomUser(uid, token) {
    return axios({
        baseURL,
        url: `/users/${uid}`,
        headers: getHeaders(token),
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
        method: 'POST',
        headers: getHeaders(token),
        data: {
            action: JSON.stringify({
                url: '/',
                role_name: 'Owner',
                verified: 1,
                role_id: 0,
            }),
        },
    }).then(({ data }) => Promise.resolve(data.deepLink));
}
