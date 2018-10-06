"use strict";
let controller = require("../controllers/controller");
module.exports = app => {
  // Setting the facebook oauth routes
  app.route("/api/auth/facebook").get(
    controller.oauthCall("facebook", {
      scope: ["email"]
    })
  );
  app
    .route("/api/auth/facebook/callback")
    .get(controller.oauthCallback("facebook"), controller.token);
};
