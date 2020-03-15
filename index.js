const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); // eslint-disable-line
const colors = require('colors'); // eslint-disable-line
const fileupload = require('express-fileupload');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const bootcamps = require('./modules/bootcamps/router');
const courses = require('./modules/courses/router');
const auth = require('./modules/auth/router');
const users = require('./modules/users/router');
const reviews = require('./modules/reviews/router');
const swagger = require('./modules/swagger');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// FIle uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000, // 10 mins
    max: 100,
});

app.use(limiter);

// Enable cors
app.use(cors());

// Prevet http param polution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Prevent XSS atacks
app.use(xss());

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use('/', swagger);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
);

// Handle unhandlet promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`.red);
    // Close server and exit process
    server.close(() => process.exit(1));
});
