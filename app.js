const path = require("path");

require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const ApiError = require('./utils/api_error');
const globalError = require('./middlewares/error_middleware');

const cors = require('cors');
const compression = require('compression');

// Routes
const mountRoutes = require('./routes');

// db connection
require('./config/database')();

const app = express();

// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

app.all('/', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

// express listening

const PORT = process.env.PORT || 3000;

const app = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    app.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});