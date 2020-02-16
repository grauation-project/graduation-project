const mongoose = require("mongoose")
const joi = require("joi");

const Schema = mongoose.Schema
const charityschema = new Schema({
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
   
  },
  
  phone: {
    type: String,
    max:15,
    required: true,

  },
  bankaccount: {
    type: Number,
    unique: true,
    required:true

  },
  country:{
    type: String,
    required: true,
    maxlength:50
  },
  address:{
    type:String,
    required:true,
    maxlength:225
  },
    
  })

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
