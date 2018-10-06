"use strict";

process.env.MONGODB_URI_TEST = "mongodb://localhost/database-test";

let glob = require("glob"),
  path = require("path"),
  mongooseConfig = require("../src/configs/mongoose");

describe("MongoDB connect", () => {
  it("connected..", done => {
    mongooseConfig.checkConnection(done);
  });
});

glob.sync(path.join(__dirname, "../src/modules/**/test/*.js")).forEach(file => {
  require(path.resolve(file));
});

describe("MongoDB disconnect", () => {
  it("disconnected..", done => {
    mongooseConfig.dropDatabase(() => {
      mongooseConfig.disconnect(done);
    });
  });
});
