'use strict';
var controller = require('../controllers/controller');
module.exports = function (app) {
    // Setting the linkedin oauth routes
    app.route('/api/auth/linkedin').get(controller.oauthCall('linkedin', {
        scope: [
            'r_basicprofile',
            'r_emailaddress'
        ]
    }));
    app.route('/api/auth/linkedin/callback').get(controller.oauthCallback('linkedin'), controller.token);
}