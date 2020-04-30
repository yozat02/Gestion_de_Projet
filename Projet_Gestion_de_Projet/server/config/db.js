const mongoose = require('mongoose');

const MONGO_USERNAME = 'mongo';
const MONGO_PASSWORD = 'mongo';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'pfa-database';

mongoose.Promise = global.Promise;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(process.env.MONGODB_URI || url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open', () => console.log(`🚀 Connected to mongo at ${url}`));