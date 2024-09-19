require('dotenv').config();
const morgan = require('morgan');
const express = require('express');

const categoryRoutes = require('./routes/category_routes');


// db connection
require('./config/database')();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// routes

app.use('api/v1/categories', categoryRoutes);


// express listening

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});