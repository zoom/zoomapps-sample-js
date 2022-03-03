import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import debug from 'debug';

const dbg = debug('hello-zoom:mongodb');

/**
 * Connect to MongoDB
 * @param uri - connection string
 */
async function connect(uri) {
    if (!uri || typeof uri !== 'string')
        throw new Error('mongodb connection string is invalid');

    mongoose.connection.on('connected', () => dbg('Connected'));
    mongoose.connection.on('error', (err) => dbg('Error', err));
    mongoose.connection.on('disconnected', () => dbg('Disconnected'));

    await mongoose.connect(uri);

    mongoose.Promise = global.Promise;

    process.on('SIGINT', () =>
        mongoose.connection.close(() =>
            dbg('SIGINT caught - closing connection')
        )
    );
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
