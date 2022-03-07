import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import debug from 'debug';
import { appName } from '../config.js';

const dbg = debug(`${appName}:mongodb`);

/**
 * Connect to MongoDB
 * @param uri - connection string
 */
async function connect(uri) {
    if (!uri || typeof uri !== 'string')
        throw new Error('mongodb connection string is invalid');

    mongoose.connection.on('connecting', () => dbg('Connecting...'));
    mongoose.connection.on('connected', () => dbg('Connected'));
    mongoose.connection.on('error', (err) => dbg('Error', err));
    mongoose.connection.on('disconnecting', () => dbg('Disconnecting...'));
    mongoose.connection.on('disconnected', () => dbg('Disconnected'));

    await mongoose.connect(uri);

    mongoose.Promise = global.Promise;

    process.on('SIGINT', () => {
        dbg('SIGINT caught => closing connection');

        mongoose.connection.close(() => dbg('connection closed'));
    });
}

/**
 * Disconnect from MongoDB
 * @return {Promise}
 */
function disconnect() {
    return mongoose.disconnect();
}

/**
 * Create a store for use with express-session
 * @return {MongoStore}
 */
function createStore() {
    if (mongoose.connection.readyState !== 1)
        throw new Error('cannot create store without a mongodb connection');

    return MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: 'sessions',
    });
}

export default {
    connect,
    disconnect,
    createStore,
};
