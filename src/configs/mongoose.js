"use strict";

const mongoose = require("mongoose");

module.exports.connection = cb => {
  let MONGODB_URI =
    process.env.MONGO_DB_URI ||
    process.env.MONGODB_URI ||
    process.env.MONGODB_URI_TEST ||
    "mongodb://localhost/database";
  // mongoose.set('debug', process.env.MONGO_DB_URI || process.env.MONGODB_URI ? false : true);
  let db = mongoose.connect(
    MONGODB_URI,
    err => {
      if (err) {
        console.log("MongoDB Notconnected..." + err);
      } else {
        if (!process.env.MONGODB_URI_TEST) {
          console.log("MongoDB Connected...");
        }
      }
    }
  );

  let glob = require("glob"),
    path = require("path");

  glob.sync(path.join(__dirname, "../modules/**/models/*.js")).forEach(file => {
    require(path.resolve(file));
  });

  return db;
};

module.exports.checkConnection = cb => {
  setTimeout(() => {
    let status = mongoose.connection.readyState;
    if (status === 1) {
      if (cb) cb();
    }
  }, 1500);
};

module.exports.dropDatabase = cb => {
  mongoose.connection.db.dropDatabase(() => {
    if (cb) cb();
  });
};

module.exports.disconnect = cb => {
  mongoose.disconnect(() => {
    if (cb) cb();
  });
};
