'use strict';
var _model = require('../models/model').model,
    controller = require('../controllers/controller');

module.exports = function (app) {
    app.route('/api/' + _model)
        .get(controller.getList)
        .post(controller.create);

    app.route('/api/' + _model + '/:' + _model + 'id')
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.param(_model + 'id', controller.getByID);
}