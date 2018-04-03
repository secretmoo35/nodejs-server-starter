'use strict';
var _model = require('../models/model').model,
    controller = require('../controllers/controller'),
    core = require('../../core/controllers/core.server.controller');

module.exports = function (app) {
    app.route('/api/' + _model).all(core.jwtCheck, isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route('/api/' + _model + '/:' + _model + 'id').all(core.jwtCheck, isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.param(_model + 'id', controller.getByID);
}

function isAllowed(req, res, next) {
    if (req.user) {
        return next();
    } else {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }
};