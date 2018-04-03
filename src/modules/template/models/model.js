'use strict';

var Model = "Template";
exports.model = Model;

// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill name',
        unique: true,
        trim: true
    }
});

mongoose.model(Model, ModelSchema);