const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose');
const app = express();

mongoose.connection();

var glob = require('glob'),
    path = require('path'),
    cors = require('cors'),
    passport = require('passport'),
    session = require('express-session');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret-session'
}));

app.get('/', function (req, res) {
    res.jsonp({
        status: 200,
        message: 'Server is running.'
    });
});

glob.sync(path.join(__dirname, '../modules/**/routes/*.js')).forEach(function (file) {
    require(path.resolve(file))(app);
});

glob.sync(path.join(__dirname, '../modules/**/strategy/*.js')).forEach(function (file) {
    require(path.resolve(file))(app);
});
 
module.exports = app;