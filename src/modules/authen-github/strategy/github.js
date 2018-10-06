"use strict";

/**
 * Module dependencies.
 */
let passport = require("passport"),
  GithubStrategy = require("passport-github").Strategy,
  controller = require("../controllers/controller");

module.exports = () => {
  // Use github strategy
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_ID || "YOUR_ID",
        clientSecret: process.env.GITHUB_ID || "YOUR_SECRET",
        callbackURL: "/api/auth/github/callback",
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        // Set the provider data and include tokens
        let providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        // Create the user OAuth profile
        let displayName = profile.displayName
          ? profile.displayName.trim()
          : profile.username.trim();
        let iSpace = displayName.indexOf(" "); // index of the whitespace following the firstName
        let firstName =
          iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
        let lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : "";

        let providerUserProfile = {
          firstName: firstName,
          lastName: lastName,
          displayName: displayName,
          email: profile.emails[0].value,
          username: profile.username,
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          profileImageURL: providerData.avatar_url
            ? providerData.avatar_url
            : undefined,
          // jscs:enable
          provider: "github",
          providerIdentifierField: "id",
          providerData: providerData
        };

        // Save the user OAuth profile
        controller.saveOAuthUserProfile(req, providerUserProfile, done);
      }
    )
  );
};
