const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const places = require('./api/routes/places');
const placeCategories = require('./api/routes/place-categories');
const authentication = require('./api/routes/authentication');
const user = require('./api/routes/user');
const tours = require('./api/routes/tours');
const feeds = require('./api/routes/feeds');
const events = require('./api/routes/events');

mongoose.connect('mongodb+srv://flyerok:177b177b@db-iprg4.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true,
        // autoIndex: false,
        retryWrites: false,
    });

app.use(express.static(__dirname + 'public'));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/places', places);
app.use('/place-categories', placeCategories);
app.use('/user', user);
app.use('/feeds', feeds);
app.use('/events', events);
app.use('/', authentication);
app.use('/', tours);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
});

module.exports = app;
