"use strict";

exports.isAllowed = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.status(403).json({
      status: 403,
      message: "User is not authorized"
    });
  }
};
