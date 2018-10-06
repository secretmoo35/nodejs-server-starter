"use strict";

let jwt = require("jsonwebtoken");

let secret = "secret key token with jwt";
exports.secretJwt = secret;

exports.jwtCheck = (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split("Bearer ")
    : "";
  jwt.verify(token[1], secret, function(err, decoded) {
    if (err) {
      return res.status(403).json({
        message: "User is not authorized"
      });
    } else {
      req.user = decoded.data;
      next();
    }
  });
};
