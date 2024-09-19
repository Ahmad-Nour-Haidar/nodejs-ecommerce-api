const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then((conn) => {
            console.log(`MongoDB Connected: ${conn.connections[0].host}`);
        }).catch((err) => {
        console.log(`MongoDB Connection Error: ${err}`);
    });
};

module.exports = dbConnection;