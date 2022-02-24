import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import debug from 'debug';

const dbg = debug('hello-zoom:mongdb');

/**
 * Connect to MongoDB
 * @param uri - connection string
 */
async function connect(uri) {
    if (!uri || typeof uri !== 'string')
        throw new Error('mongodb connection string is invalid');

    await mongoose.connect(uri);

    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => dbg('connected', uri));
    mongoose.connection.on('error', (err) => dbg('error', err));
    mongoose.connection.on('disconnected', () => dbg('disconnected'));

    process.on('SIGINT', () =>
        mongoose.connection.close(() =>
            dbg('SIGINT caught - closing connection')
        )
    );
}

/**
 * Disconnect from MongoDB
 * @return {Promise<void>}
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
        throw new Error('cannot create store without mongoose connection');

    return MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: 'sessions',
    });
}

const db = {
    connect,
    disconnect,
    createStore,
};

export default db;
