import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import { authSchema } from './auth.js';
import { encryptionKey, signingKey } from '../../config.js';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        id: { type: String, unique: true, required: true, dropDups: true },
        auth: [authSchema],
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(encrypt, {
    encryptionKey,
    signingKey,
    encryptedFields: [], // no need to encrypt the ID
    decryptPostSave: false,
    additionalAuthenticatedFields: ['auth'], // encrypt the auth document
});

const User = mongoose.model('User', userSchema);

export default User;
