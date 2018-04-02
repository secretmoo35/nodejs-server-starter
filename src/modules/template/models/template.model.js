'use strict';

var mongoose = require('mongoose');
var Model = "Template";
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

exports.model = Model;