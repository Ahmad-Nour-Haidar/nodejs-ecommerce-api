const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((conn) => {
            console.log(`MongoDB Connected: ${conn.connections[0].host}`);
        });
};

module.exports = dbConnection;