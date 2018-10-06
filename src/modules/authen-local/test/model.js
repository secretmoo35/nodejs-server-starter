"use strict";
let should = require("should"),
  mongoose = require("mongoose"),
  _model = require("../models/model").model,
  Model = mongoose.model(_model);

let user;

describe(_model + " Model save tests", () => {
  before(done => {
    user = {
      firstName: "Full",
      lastName: "Name",
      displayName: "Full Name",
      email: "_test@test.com",
      username: "_username",
      password: "1",
      provider: "local"
    };
    done();
  });

  it("should be able to save without problems", done => {
    let _user = new Model(user);
    _user.save(err => {
      should.not.exist(err);
      _user.remove(err => {
        should.not.exist(err);
        done();
      });
    });
  });
});
