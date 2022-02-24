import { validationResult } from 'express-validator';
import createError from 'http-errors';

/**
 * sanitize - throw an error if the request did not pass validation
 * @param {Request} req - HTTP request to operate on
 */
export function sanitize(req) {
    return new Promise((resolve, reject) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) resolve();

        const { msg } = errors.array({ onlyFirstError: true })[0];
        const e = new Error(msg);
        e.code = 400;

        reject(e);
    });
}

/**
 * Passes errors to the error handler route
 * @param {Error} e - error created by axios or manually using e.code and e.message
 * @return {Error}
 */
export function handleError(e) {
    let status = e.status || e.code;
    let data = e.message;

    if (e.response) {
        status = e.response.status;
        data = e.response.data;
    } else if (e.request) {
        data = e.request;
    }

    return createError(status || 500, data);
}
