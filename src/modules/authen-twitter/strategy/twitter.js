"use strict";

/**
 * Module dependencies.
 */
let passport = require("passport"),
  TwitterStrategy = require("passport-twitter").Strategy,
  controller = require("../controllers/controller");

module.exports = () => {
  // Use twitter strategy
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_ID || "YOUR_ID",
        consumerSecret: process.env.TWITTER_SECRET || "YOUR_SECRET",
        callbackURL: "/api/auth/twitter/callback"
      },
      (req, token, tokenSecret, profile, done) => {
        // Set the provider data and include tokens
        let providerData = profile._json;
        providerData.token = token;
        providerData.tokenSecret = tokenSecret;

        // Create the user OAuth profile
        let displayName = profile.displayName.trim();
        let iSpace = displayName.indexOf(" "); // index of the whitespace following the firstName
        let firstName =
          iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
        let lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : "";

        let providerUserProfile = {
          firstName: firstName,
          lastName: lastName,
          displayName: displayName,
          username: profile.username,
          profileImageURL: profile.photos[0].value.replace("normal", "bigger"),
          provider: "twitter",
          providerIdentifierField: "id_str",
          providerData: providerData
        };

        // Save the user OAuth profile
        controller.saveOAuthUserProfile(req, providerUserProfile, done);
      }
    )
  );
};
