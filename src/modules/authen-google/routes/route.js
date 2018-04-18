'use strict';
var controller = require('../controllers/controller');
module.exports = function (app) {
    // Setting the google oauth routes
    app.route('/api/auth/google').get(controller.oauthCall('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    app.route('/api/auth/google/callback').get(controller.oauthCallback('google'), controller.token);
}