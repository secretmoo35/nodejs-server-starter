'use strict';

process.env.MONGODB_URI_TEST = 'mongodb://localhost/database-test';

var glob = require('glob'),
    path = require('path'),
    mongoose = require('mongoose'),
    mongooseConfig = require('../src/config/mongoose');

describe('MongoDB connect', function () {

    it('connected..', function (done) {
        mongoose.connection.on('connected', function () {
            done();
        });
    });

});

glob.sync(path.join(__dirname, '../src/modules/**/test/*.js')).forEach(function (file) {
    require(path.resolve(file));
});

describe('MongoDB disconnect', function () {

    it('disconnected..', function (done) {
        mongooseConfig.dropDatabase(function () {
            mongooseConfig.disconnect(done);
        });
    });

});