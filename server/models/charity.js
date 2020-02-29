const mongoose = require("mongoose")
var joi = require("joi");

var charity = mongoose.model("charity", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 25

  },
  img: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255

  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255
  },

  phone: {
    type: String,
    min: 11,
    max: 14,
    required: true,

  },
  bankaccount: {
    type: String,
    unique: true

  },
  country: {
    type: String,
    required: true,
    maxlength: 50
  },
  address: {
    type: String,
    required: true
  },
  coverimg: {
    type: String
  }

}));


function validatecharity(charities) {
  var Schema = {
    name: joi.string().min(6).max(25).required(),
    img: joi.string(),
    email: joi.string().min(15).max(225).required(),
    password: joi.string().min(8).max(255).required(),
    phone: joi.string().min(11).max(14).required(),
    bankaccount: joi.string().max(20).required(),
    country: joi.string().max(15).required(),
    address: joi.string().min(5).max(55).required(),

  };
  return joi.validate(charities, Schema)
}
exports.validatecharity = validatecharity;

exports.charity = charity;
