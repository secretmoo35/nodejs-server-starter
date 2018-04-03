const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var glob = require('glob'),
    path = require('path');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

glob.sync(path.join(__dirname, '../modules/**/routes/*.js')).forEach(function (file) {
    require(path.resolve(file))(app);
});

module.exports = app;