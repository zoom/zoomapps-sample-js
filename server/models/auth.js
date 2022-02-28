import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import { encryptionKey, signingKey } from '../../config.js';

const { Schema } = mongoose;

const options = {
    unique: true,
    required: true,
    dropDups: true,
};

export const authSchema = new Schema(
    {
        accessToken: {
            type: String,
            ...options,
        },
        refreshToken: {
            type: String,
            ...options,
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
