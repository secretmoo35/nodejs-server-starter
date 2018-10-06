"use strict";

/**
 * Module dependencies.
 */
let passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  controller = require("../controllers/controller");

module.exports = () => {
  // Use google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID || "YOUR_ID",
        clientSecret: process.env.GOOGLE_SECRET || "YOUR_SECRET",
        callbackURL: "/api/auth/google/callback",
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        // Set the provider data and include tokens
        let providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        // Create the user OAuth profile
        let providerUserProfile = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          profileImageURL: providerData.picture
            ? providerData.picture
            : undefined,
          provider: "google",
          providerIdentifierField: "id",
          providerData: providerData
        };

        // Save the user OAuth profile
        controller.saveOAuthUserProfile(req, providerUserProfile, done);
      }
    )
  );
};
