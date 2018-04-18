'use strict';
var errorHandler = require('../../core/controllers/errors.server.controller'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    secretJwt = require('../../core/controllers/core.server.controller').secretJwt,
    _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
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
            req.user = user;
            next();
        })(req, res, next);
    };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function (req, providerUserProfile, done) {
    // Define a search query fields
    var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
    var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

    // Define main provider search query
    var mainProviderSearchQuery = {};
    mainProviderSearchQuery.provider = providerUserProfile.provider;
    mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define additional provider search query
    var additionalProviderSearchQuery = {};
    additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define a search query to find existing user with current provider profile

    var searchQuery = {
        $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
    };
    User.findOne(searchQuery, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {

            var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

            User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                user = new User({
                    firstName: providerUserProfile.firstName,
                    lastName: providerUserProfile.lastName,
                    username: availableUsername,
                    displayName: providerUserProfile.displayName,
                    email: providerUserProfile.email,
                    profileImageURL: providerUserProfile.profileImageURL,
                    provider: providerUserProfile.provider,
                    providerData: providerUserProfile.providerData
                });

                // And save the user
                user.save(function (err, user) {
                    return done(err, user);
                });
            });
        } else {
            return done(null, user);
        }
    });
};

exports.token = function (req, res) {
    var token = jwt.sign(_.omit(req.user), secretJwt, {
        expiresIn: 2 * 60 * 60 * 1000
    });

    return res.redirect(301, (process.env.REDIRECT_URL || 'http://localhost:4200/') + '?' + token);
    // * Web client get token from search url function ==> window.location.search.slice(1)
};