'use strict'

const app = require('./express');

app.get('/', function (req, res) {
    res.jsonp({
        status: 200,
        message: 'Server is running.'
    });
});

module.exports = app;