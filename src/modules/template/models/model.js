'use strict';

var Model = "Template";
exports.model = Model;

// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createBy: {},
    updateBy: {}
});

mongoose.model(Model, ModelSchema);