"use strict";
let controller = require("../controllers/controller");
module.exports = app => {
  // Setting the github oauth routes
  app.route("/api/auth/github").get(controller.oauthCall("github"));
  app
    .route("/api/auth/github/callback")
    .get(controller.oauthCallback("github"), controller.token);
};
