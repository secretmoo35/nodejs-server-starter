"use strict";

let Model = "User";
exports.model = Model;

// use model
let validator = require("validator");
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let Schema = mongoose.Schema;

let validateLocalStrategyEmail = email => {
  return (
    (this.provider !== "local" && !this.updated) || validator.isEmail(email)
  );
};

let ModelSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: "",
    required: "Please fill in your first name"
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
    required: "Please fill in your last name"
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: "",
    validate: [validateLocalStrategyEmail, "Please fill a valid email address"]
  },
  username: {
    type: String,
    unique: "Username already exists",
    required: "Please fill in a username",
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ""
  },
  salt: {
    type: String
  },
  profileImageURL: {
    type: String,
    default:
      "http://res.cloudinary.com/hflvlav04/image/upload/v1487834187/g3hwyieb7dl7ugdgj3tb.png"
  },
  provider: {
    type: String,
    required: "Provider is required"
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [
      {
        type: String,
        enum: ["user", "admin"]
      }
    ],
    default: ["user"],
    required: "Please provide at least one role"
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  loginToken: {
    type: String
  },
  loginExpires: {
    type: Date
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

//hashing a password before saving it to the database
ModelSchema.pre("save", function(next) {
  let user = this;
  let round = 13;
  this.salt = bcrypt.genSaltSync(round);
  bcrypt.hash(user.password, this.salt, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

/**
 * Find possible not used username
 */
ModelSchema.statics.findUniqueUsername = (username, suffix, callback) => {
  let _this = this;
  let possibleUsername = username.toLowerCase() + (suffix || "");

  _this.findOne(
    {
      username: possibleUsername
    },
    (err, user) => {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        } else {
          return _this.findUniqueUsername(
            username,
            (suffix || 0) + 1,
            callback
          );
        }
      } else {
        callback(null);
      }
    }
  );
};

mongoose.model(Model, ModelSchema);
