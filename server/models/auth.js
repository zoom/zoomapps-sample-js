import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import { encryptionKey, signingKey } from '../helpers/auth.js';

import debug from 'debug';

const dbg = debug('hello-zoom:encrypt');

dbg(encryptionKey, signingKey);

const { Schema } = mongoose;

export const authSchema = new Schema(
    {
        accessToken: {
            type: String,
            unique: true,
            required: true,
            dropDups: true,
        },
        refreshToken: {
            type: String,
            unique: true,
            required: true,
            dropDups: true,
        },
        expiresAt: { type: String, required: true },
        scope: String,
    },
    {
        timestamps: true,
    }
);

authSchema.plugin(encrypt, {
    encryptionKey,
    signingKey,
    decryptPostSave: false,
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
