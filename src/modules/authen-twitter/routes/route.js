"use strict";
let controller = require("../controllers/controller");
module.exports = app => {
  // Setting the twitter oauth routes
  app.route("/api/auth/twitter").get(controller.oauthCall("twitter"));
  app
    .route("/api/auth/twitter/callback")
    .get(controller.oauthCallback("twitter"), controller.token);
};
