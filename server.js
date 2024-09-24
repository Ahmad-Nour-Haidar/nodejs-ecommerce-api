const path = require("path");

require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const ApiError = require('./utils/api_error');
const globalError = require('./middlewares/error_middleware');

// Routes
const categoryRoutes = require('./routes/category_routes');
const subCategoryRoute = require('./routes/subcategory_routes');
const brandRoute = require('./routes/brand_route');
const productRoute = require('./routes/product_route');
const userRoute = require('./routes/user_route');
const authRoute = require('./routes/auth_route');
const reviewRoute = require('./routes/review_route');
const wishlistRoute = require('./routes/wishlist_route');
const addressRoute = require('./routes/address_route');


// db connection
require('./config/database')();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/addresses', addressRoute);

app.all('/', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

// express listening

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});