import axios from 'axios';

const redirectUri = process.env.ZM_REDIRECT_URI;
const zoom = process.env.ZM_HOST;

function unpack(ctx) {
    // Decode base64
    let buf = Buffer.from(ctx, 'base64');

    // Get iv length (1 byte)
    const ivLength = buf.readUInt8();
    buf = buf.slice(1);

    // Get iv
    const iv = buf.slice(0, ivLength);
    buf = buf.slice(ivLength);

    // Get aad length (2 bytes)
    const aadLength = buf.readUInt16LE();
    buf = buf.slice(2);

    // Get aad
    const aad = buf.slice(0, aadLength);
    buf = buf.slice(aadLength);

    // Get cipher length (4 bytes)
    const cipherLength = buf.readInt32LE();
    buf = buf.slice(4);

    // Get cipherText
    const cipherText = buf.slice(0, cipherLength);

    // Get tag
    const tag = buf.slice(cipherLength);

    return {
        iv,
        aad,
        cipherText,
        tag,
    };
}

/**
 * GetToken obtains an OAuth access token from Zoom
 * @param code - authorization code from user authorization
 * @return {Promise} - promise resolving to the access token object
 */
export async function GetToken(code) {
    const data = new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    }).toString();

    return axios
        .post(`${zoom}/oauth/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(({ data }) => Promise.resolve(data));
}

/**
 * Decrypts the Zoom App Context
 * @see https://marketplace.zoom.us/docs/beta-docs/zoom-apps/zoomappcontext#decrypting-the-header-value
 * @param {String} ctx - Zoom App Context to decryptCtx
 * @param {String} key -
 * @return {JSON} Decrypted Zoom App Context
 */
export function decrypt(ctx, key) {
    if (!ctx || typeof ctx !== 'string')
        throw new Error('ctx must be a string');

    if (!key || typeof key !== 'string')
        throw new Error('key must be a string');

    const { iv, aad, cipherText, tag } = unpack(ctx);

    // Create sha256 hash from key
    const hash = crypto.createHash('sha256').update(key).digest();

    // AES/GCM decryption
    const decipher = crypto
        .createDecipheriv('aes-256-gcm', hash, iv)
        .setAAD(aad)
        .setAuthTag(tag)
        .setAutoPadding(false);

    const update = decipher.update(cipherText, 'hex', 'utf-8');
    const final = decipher.final('utf-8');

    const decrypted = update + final;

    return JSON.parse(decrypted);
}
