"use strict";

/**
 * Module dependencies.
 */
let passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  controller = require("../controllers/controller");

module.exports = () => {
  // Use facebook strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID || "YOUR_ID",
        clientSecret: process.env.FACEBOOK_SECRET || "YOUR_SECRET",
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["id", "name", "displayName", "emails", "photos"],
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
          email: profile.emails ? profile.emails[0].value : undefined,
          username: profile.username || generateUsername(profile),
          profileImageURL: profile.id
            ? "//graph.facebook.com/" + profile.id + "/picture?type=large"
            : undefined,
          provider: "facebook",
          providerIdentifierField: "id",
          providerData: providerData
        };

        // Save the user OAuth profile
        controller.saveOAuthUserProfile(req, providerUserProfile, done);

        generateUsername = profile => {
          let username = "";

          if (profile.emails) {
            username = profile.emails[0].value.split("@")[0];
          } else if (profile.name) {
            username = profile.name.givenName[0] + profile.name.familyName;
          }

          return username.toLowerCase() || undefined;
        };
      }
    )
  );
};
