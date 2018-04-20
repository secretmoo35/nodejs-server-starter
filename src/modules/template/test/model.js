'use strict';
var should = require('should'),
    mongoose = require('mongoose'),
    _model = require('../models/model').model,
    Model = mongoose.model(_model);

var item;

describe(_model + ' Model save tests', function () {

    before(function (done) {
        item = {
            name: 'name'
        };
        done();
    });

    it('should be able to save without problems', function (done) {
        var _item = new Model(item);
        _item.save(function (err) {
            should.not.exist(err);
            _item.remove(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });
});