'use strict';
var glob = require('glob'),
    path = require('path'),
    file = glob.sync(path.join(__dirname, '../models/*.model.js')),
    model = require(file[0]).model,
    controller = require('../controllers/' + model.toLowerCase() + '.controller');

module.exports = function (app) {
    app.route('/api/' + model)
        .get(controller.getList)
        .post(controller.create);

    app.route('/api/' + model + '/:' + model + 'id')
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.param(model + 'id', controller.getByID);
}