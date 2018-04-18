'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LinkedInStrategy = require('passport-linkedin').Strategy,
  controller = require('../controllers/controller');

module.exports = function () {
  // Use twitter strategy
  passport.use(new LinkedInStrategy({
      consumerKey: process.env.LINKEDIN_ID || 'YOUR_ID',
      consumerSecret: process.env.LINKEDIN_SECRET || 'YOUR_SECRET',
      callbackURL: '/api/auth/linkedin/callback',
      passReqToCallback: true,
      profileFields: ['id', 'first-name', 'last-name', 'email-address', 'picture-url']
    },
    function (req, accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      var providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        profileImageURL: (providerData.pictureUrl) ? providerData.pictureUrl : undefined,
        provider: 'linkedin',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      controller.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};