require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const ApiError = require('./utils/api_error');
const categoryRoutes = require('./routes/category_routes');


// db connection
require('./config/database')();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount Routes

app.use('/api/v1/categories', categoryRoutes);

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// express listening

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});