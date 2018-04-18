'use strict';
var controller = require('../controllers/controller');
module.exports = function (app) {
    // Setting the github oauth routes
    app.route('/api/auth/github').get(controller.oauthCall('github'));
    app.route('/api/auth/github/callback').get(controller.oauthCallback('github'), controller.token);
}