"use strict";
let controller = require("../controllers/controller"),
  core = require("../../core/controllers/core.server.controller"),
  policy = require("../policy/policy");
module.exports = app => {
  app.route("/api/user").all(core.jwtCheck, policy.isAllowed)
    .get(controller.getUser);

  app.route("/api/auth/signup").post(controller.signup, controller.token);
  app.route("/api/auth/signin").post(controller.signin, controller.token);
};
