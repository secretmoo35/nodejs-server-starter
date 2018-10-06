"use strict";
let should = require("should"),
  mongoose = require("mongoose"),
  _model = require("../models/model").model,
  Model = mongoose.model(_model);

let item;

describe(_model + " Model save tests", () => {
  before(done => {
    item = {
      name: "name"
    };
    done();
  });

  it("should be able to save without problems", done => {
    let _item = new Model(item);
    _item.save(err => {
      should.not.exist(err);
      _item.remove(err => {
        should.not.exist(err);
        done();
      });
    });
  });
});
