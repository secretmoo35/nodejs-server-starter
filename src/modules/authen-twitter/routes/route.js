'use strict';
var controller = require('../controllers/controller');
module.exports = function (app) {
    // Setting the twitter oauth routes
    app.route('/api/auth/twitter').get(controller.oauthCall('twitter'));
    app.route('/api/auth/twitter/callback').get(controller.oauthCallback('twitter'), controller.token);
}