"use strict";

let Model = "Template";
exports.model = Model;

// use model
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ModelSchema = new Schema({
  name: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  createby: {
    _id: {
      type: String
    },
    username: {
      type: String
    },
    displayName: {
      type: String
    }
  },
  updateby: {
    _id: {
      type: String
    },
    username: {
      type: String
    },
    displayName: {
      type: String
    }
  }
});

mongoose.model(Model, ModelSchema);
