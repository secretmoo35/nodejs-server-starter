"use strict";

/**
 * Module dependencies.
 */
let passport = require("passport"),
  bcrypt = require("bcrypt"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("mongoose").model("User");

module.exports = () => {
  // Use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      (username, password, done) => {
        User.findOne(
          {
            username: username.toLowerCase()
          },
          (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, {
                message: "User not found."
              });
            }
            bcrypt.compare(password, user.password, (err, result) => {
              if (result === true) {
                return done(null, user);
                next();
              } else {
                return done(null, false, {
                  status: 401,
                  message: "Username or Password is invalid."
                });
              }
            });
          }
        );
      }
    )
  );
};
