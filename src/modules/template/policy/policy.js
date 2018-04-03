'use strict';

exports.isAllowed = function (req, res, next) {
    if (req.user || req.method === 'GET') {
        return next();
    } else {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }
};