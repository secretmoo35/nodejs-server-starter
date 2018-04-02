'use strict';
var mongoose = require('mongoose');
var Model = "User";
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        required: 'Please fill firstname',
        unique: true,
        trim: true
    },
    lastName: {
        type: String
    }
});

mongoose.model(Model, ModelSchema);

exports.model = Model;