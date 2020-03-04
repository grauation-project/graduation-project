var mongoose = require('mongoose');

var joi = require("joi");
const Schema = mongoose.Schema
const comment = new Schema({


    text:{
      type:String,
    min:1,
  max:200
},
    postedby:{
      type:mongoose.Schema.Types.ObjectId,
      enum:['volunteer','charity']
    },
  
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
  

})



module.exports = mongoose.model("comment", comment)  