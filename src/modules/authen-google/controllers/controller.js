'use strict';
var errorHandler = require('../../core/controllers/errors.server.controller'),
    passport = require('passport');
/**
 * OAuth provider call
 */
exports.oauthCall = function (strategy, scope) {
    return function (req, res, next) {
        // Authenticate
        passport.authenticate(strategy, scope)(req, res, next);
    };
};

/**
 * OAuth callback
 */
exports.oauthCallback = function (strategy) {
    return function (req, res, next) {

        passport.authenticate(strategy, function (err, user, redirectURL) {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: err
                });
            }
            if (!user) {
                return res.status(400).send({
                    status: 400,
                    message: 'User not found.'
                });
            }
            res.jsonp({
                status: 200,
                data: user
            });
        })(req, res, next);
    };
};