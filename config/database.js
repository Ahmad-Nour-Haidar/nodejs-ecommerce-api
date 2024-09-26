const mongoose = require('mongoose');

const dbConnection = () => {
    let uri;
    if (process.env.NODE_ENV !== 'production') {
        uri = process.env.MONGODB_URI;
    } else {
        uri = process.env.MONGODB_URI_REMOTE;
    }
    mongoose
        .connect(uri)
        .then((conn) => {
            console.log(`MongoDB URI: ${uri}`);
            console.log(`MongoDB Connected: ${conn.connections[0].host}`);
        });
};

module.exports = dbConnection;