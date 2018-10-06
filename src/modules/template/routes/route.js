"use strict";
let _model = require("../models/model").model,
  controller = require("../controllers/controller"),
  core = require("../../core/controllers/core.server.controller"),
  policy = require("../policy/policy");
module.exports = app => {
  let url = "/api/" + _model;
  let urlWithParam = "/api/" + _model + "/:" + _model + "id";
  app
    .route(url)
    .all(core.jwtCheck, policy.isAllowed)
    .get(controller.getList, controller.returnDatas)
    .post(controller.create, controller.returnData);

  app
    .route(urlWithParam)
    .all(core.jwtCheck, policy.isAllowed)
    .get(controller.returnData)
    .put(controller.update, controller.returnData)
    .delete(controller.delete, controller.returnData);

  app.param(_model + "id", controller.getByID);
};
