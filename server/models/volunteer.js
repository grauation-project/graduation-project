var mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
        minlength: 5,
        maxlength: 100,
        lowercase: true,
        unique:true,
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
        required:true
    },
    img:String,
})


module.exports = mongoose.model('volunteer',volunteer);