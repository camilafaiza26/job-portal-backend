const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./src/routes/auth.route');
const applicatRoutes = require('./src/routes/applicant.route');
const jobApplicationRoutes = require('./src/routes/job-application.route');
const cookieParser = require('cookie-parser');

const { httpLogStream } = require('./src/utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,              
};
app.use(cors(corsOptions));



app.use('/api/auth', authRoute);
app.use('/api/applicant', applicatRoutes);
app.use('/api/job-application', jobApplicationRoutes);



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;