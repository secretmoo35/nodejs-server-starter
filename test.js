'use strict';

process.env.MONGODB_URI_TEST = 'mongodb://localhost/database-test';

const request = require('supertest');
const app = require('./src/config/express');

var glob = require('glob'),
    path = require('path');

describe('Server', function () {

    it('should be start server', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .end(done);

    });

});

glob.sync(path.join(__dirname, './src/modules/**/test/*.js')).forEach(function (file) {
    require(path.resolve(file));
});
