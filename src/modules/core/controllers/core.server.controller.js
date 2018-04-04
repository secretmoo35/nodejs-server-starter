'use strict';

var jwt = require('express-jwt');
var secret = 'secret key token with jwt';
exports.secretJwt = secret;
exports.jwtCheck = jwt({
    secret: secret,
    credentialsRequired: false
});