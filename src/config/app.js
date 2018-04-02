'use strict'

const app = require('./express');
const mongoose = require('./mongoose');

mongoose();

app.get('/', function (req, res) {
    res.jsonp({
        status: 200
    });
});

module.exports = app;