'use strict';
var glob = require('glob'),
    path = require('path'),
    mongoose = require('mongoose'),
    file = glob.sync(path.join(__dirname, '../models/*.model.js')),
    _model = require(file[0]).model,
    Model = mongoose.model(_model),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

exports.getList = function (req, res) {
    Model.find(function (err, datas) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(datas);
        };
    });
};

exports.create = function (req, res) {
    var mongooseModel = new Model(req.body);
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(data);
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Id is invalid'
        });
    }

    Model.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data;
            next();
        };
    });
};

exports.read = function (req, res) {
    res.jsonp(req.data);
};

exports.update = function (req, res) {
    var mongooseModel = _.extend(req.data, req.body);
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(data);
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200
            });
        };
    });
};