'use strict';

process.env.MONGODB_URI_TEST = 'mongodb://localhost/database-test';

var glob = require('glob'),
    path = require('path');

glob.sync(path.join(__dirname, './src/modules/**/test/*.js')).forEach(function (file) {
    require(path.resolve(file));
});