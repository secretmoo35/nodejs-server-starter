'use strict';

var jwt = require('express-jwt');

exports.jwtCheck = jwt({
    secret: 'ngEurope rocks!',
    credentialsRequired: false
});