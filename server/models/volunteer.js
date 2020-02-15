var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var joi = require("joi");
var volunteer = new Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique: true,
        maxlength: 255,
        lowercase: true,
        required: true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        // maxlength:16
    },
    Age:Number,
    phone:{
        type:Number,
        minlength: 11,
        maxlength: 15,
        required: true
    },
    country:{
        type:String,
        required:true,
        maxlength:50,
    },
    img:String,
})

function validateVolunter(volunteer) {
    var Schema = {
    fname: joi.string().required(),
     lname: joi.string().required(),
      email: joi.string().max(255).email().unique().required(),
      password: joi.string().min(8).required(),
      phone: joi.number().min(11).max(15).required(),
      country: joi.string().max(50).required(),

    };
    return joi.validate(volunteer, Schema)
  }
  
  exports.validateVolunter = validateVolunter;
  

module.exports = mongoose.model('volunteer',volunteer);