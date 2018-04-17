'use strict';
var mongoose = require('mongoose'),
    passport = require('passport'),
    _model = require('../models/model').model,
    Model = mongoose.model(_model),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    secretJwt = require('../../core/controllers/core.server.controller').secretJwt;


exports.getList = function (req, res) {
    Model.find(function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
};

exports.create = function (req, res) {
    var mongooseModel = new Model(req.body);
    mongooseModel.createby = req.user;
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Model.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var mongooseModel = _.extend(req.data, req.body);
    mongooseModel.updated = new Date();
    mongooseModel.updateby = req.user;
    mongooseModel.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.getUser = function (req, res) {
    req.user.password = undefined;
    req.user.salt = undefined;
    req.user.loginToken = undefined;
    res.jsonp({
        status: 200,
        data: req.user
    })
};

/**
 * Signup
 */

exports.signup = function (req, res, next) {

    var user = new Model(req.body);
    // // Add missing user fields
    user.provider = user.provider ? user.provider : 'local';
    user.displayName = user.firstName + ' ' + user.lastName;

    // Then save the user
    user.save(function (err, resUser) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.user = resUser;
            next();
        }
    });
};

/**
 * Signin
 */

exports.signin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

/**
 * Genarate token
 */

exports.token = function (req, res) {
    var user = req.user;
    user.password = undefined;
    user.salt = undefined;
    user.loginToken = "";
    user.loginToken = jwt.sign(_.omit(user, 'password'), secretJwt, {
        expiresIn: 2 * 60 * 60 * 1000
    });
    user.loginExpires = Date.now() + (2 * 60 * 60 * 1000); // 2 hours
    // return res.jsonp(user);
    res.jsonp({
        status: 200,
        token: user.loginToken
    });
};