"use strict";
let passport = require("passport"),
  jwt = require("jsonwebtoken"),
  secretJwt = require("../../core/controllers/core.server.controller")
    .secretJwt,
  _ = require("lodash"),
  mongoose = require("mongoose"),
  User = mongoose.model("User");
/**
 * OAuth provider call
 */
exports.oauthCall = (strategy, scope) => {
  return (req, res, next) => {
    // Authenticate
    passport.authenticate(strategy, scope)(req, res, next);
  };
};

/**
 * OAuth callback
 */
exports.oauthCallback = strategy => {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, redirectURL) => {
      if (err) {
        return res.status(400).send({
          status: 400,
          message: err
        });
      }
      if (!user) {
        return res.status(400).send({
          status: 400,
          message: "User not found."
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
exports.saveOAuthUserProfile = (req, providerUserProfile, done) => {
  // Define a search query fields
  let searchMainProviderIdentifierField =
    "providerData." + providerUserProfile.providerIdentifierField;
  let searchAdditionalProviderIdentifierField =
    "additionalProvidersData." +
    providerUserProfile.provider +
    "." +
    providerUserProfile.providerIdentifierField;

  // Define main provider search query
  let mainProviderSearchQuery = {};
  mainProviderSearchQuery.provider = providerUserProfile.provider;
  mainProviderSearchQuery[searchMainProviderIdentifierField] =
    providerUserProfile.providerData[
      providerUserProfile.providerIdentifierField
    ];

  // Define additional provider search query
  let additionalProviderSearchQuery = {};
  additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] =
    providerUserProfile.providerData[
      providerUserProfile.providerIdentifierField
    ];

  // Define a search query to find existing user with current provider profile

  let searchQuery = {
    $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
  };
  User.findOne(searchQuery, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      let possibleUsername =
        providerUserProfile.username ||
        (providerUserProfile.email
          ? providerUserProfile.email.split("@")[0]
          : "");

      User.findUniqueUsername(possibleUsername, null, availableUsername => {
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
        user.save((err, user) => {
          return done(err, user);
        });
      });
    } else {
      return done(null, user);
    }
  });
};

exports.token = (req, res) => {
  let token = jwt.sign(_.omit(req.user), secretJwt, {
    expiresIn: 2 * 60 * 60 * 1000
  });

  return res.redirect(
    301,
    (process.env.REDIRECT_URL || "http://localhost:4200/") + "?" + token
  );
  // * Web client get token from search url function ==> window.location.search.slice(1)
};
