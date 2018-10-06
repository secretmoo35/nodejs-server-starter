"use strict";
let mongoose = require("mongoose"),
  passport = require("passport"),
  _model = require("../models/model").model,
  Model = mongoose.model(_model),
  errorHandler = require("../../core/controllers/errors.server.controller"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken"),
  secretJwt = require("../../core/controllers/core.server.controller")
    .secretJwt;

exports.getUser = (req, res) => {
  Model.findById(req.user._id, (err, data) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      req.user = data;
      req.user.password = undefined;
      req.user.salt = undefined;
      req.user.loginToken = undefined;
      req.user.loginToken = jwt.sign(_.omit(req.user, "password"), secretJwt, {
        expiresIn: 2 * 60 * 60 * 1000
      });
      req.user.loginExpires = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
      res.jsonp({
        status: 200,
        data: req.user
      });
    }
  });
};

/**
 * Signup
 */

exports.signup = (req, res, next) => {
  let user = new Model(req.body);
  // // Add missing user fields
  user.provider = user.provider ? user.provider : "local";
  user.displayName = user.firstName + " " + user.lastName;

  // Then save the user
  user.save((err, resUser) => {
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

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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

exports.token = (req, res) => {
  let user = req.user;
  user.password = undefined;
  user.salt = undefined;
  user.loginToken = "";
  user.loginToken = jwt.sign(
    {
      data: user
    },
    "secret",
    { expiresIn: 60 * 60 }
  );
  res.jsonp({
    status: 200,
    token: user.loginToken,
    data: req.user
  });
};
