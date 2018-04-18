'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  GithubStrategy = require('passport-github').Strategy,
  controller = require('../controllers/controller');

module.exports = function () {
  // Use github strategy
  passport.use(new GithubStrategy({
      clientID: process.env.GITHUB_ID || 'YOUR_ID',
      clientSecret: process.env.GITHUB_ID || 'YOUR_SECRET',
      callbackURL: '/api/auth/github/callback',
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      var displayName = profile.displayName ? profile.displayName.trim() : profile.username.trim();
      var iSpace = displayName.indexOf(' '); // index of the whitespace following the firstName
      var firstName = iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
      var lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : '';

      var providerUserProfile = {
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        email: profile.emails[0].value,
        username: profile.username,
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        profileImageURL: (providerData.avatar_url) ? providerData.avatar_url : undefined,
        // jscs:enable
        provider: 'github',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      controller.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};