const path = require("path");

const rateLimit = require('express-rate-limit');

const mongoSanitize = require('express-mongo-sanitize');

const hpp = require('hpp');

require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const ApiError = require('./utils/api_error');
const globalError = require('./middlewares/error_middleware');

const {webhookCheckout} = require('./services/order_service');


// db connection
require('./config/database')();

const app = express();

// Routes
const mountRoutes = require('./routes');

const cors = require('cors');
const compression = require('compression');

// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

// Checkout webhook
app.post(
    '/webhook-checkout',
    express.raw({type: 'application/json'}),
    webhookCheckout
);

app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// To remove data using these defaults:
app.use(mongoSanitize());

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
        'Too many accounts created from this IP, please try again after an 15 minutes',
});

// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
    hpp({
        whitelist: [
            'price',
            'sold',
            'quantity',
            'ratingsAverage',
            'ratingsQuantity',
        ],
    })
);

// Mount Routes
mountRoutes(app);

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