const mongoose = require("mongoose")
const Joi = require("joi");

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
    max: 225

  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16
  },
  
  phone: {
    type: String,
    min:4,
    max:14,
    required: true,

  },
  bankaccount: {
    type: Number,
    unique: true

  },
  country:{
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
    
  })

module.exports = mongoose.model("charity", charityschema)
