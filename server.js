require('dotenv').config();

const morgan = require('morgan');

const mongoose = require('mongoose');

const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

app.get('/', (req, res) => {
    res.send('Our API');
});

mongoose.connect(process.env.MONGODB_URI)
    .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connections[0].host}`);
    }).catch((err) => {
    console.log(`MongoDB Connection Error: ${err}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});