const mongoose = require("mongoose")
<<<<<<< HEAD
var joi = require("joi");
=======
const joi = require("joi");
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9

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
<<<<<<< HEAD
    max: 255
=======
   
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9
  },

  phone: {
    type: String,
<<<<<<< HEAD
    min: 11,
    max: 14,
=======
    max:15,
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9
    required: true,

  },
  bankaccount: {
<<<<<<< HEAD
    type: String,
    unique: true
=======
    type: Number,
    unique: true,
    required:true
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9

  },
  country: {
    type: String,
    required: true,
    maxlength:50
  },
<<<<<<< HEAD
  address: {
    type: String,
    required: true
=======
  address:{
    type:String,
    required:true,
    maxlength:225
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9
  },

<<<<<<< HEAD
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
=======
  function validatecharity(payment) {
    var Schema = {
      name: joi.string().max(25).required(),
      email: joi.string().max(255).email({minDomainSegments:2,tlds:{allow:['com','net']}}).unique().required(),
      password: joi.string().min(8).required(),
      bankaccount: joi.number().unique().required(),
      phone: joi.number().max(15).required(),
      country: joi.string().max(50).required(),
      address: joi.string().max(225).required(),
     
     
  
    };
    return joi.validate(payment, Schema)
  }
  
  exports.validatecharity = validatecharity;

module.exports = mongoose.model("charity", charityschema)
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9
