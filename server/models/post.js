var mongoose = require('mongoose');

var joi = require("joi");
const Schema = mongoose.Schema
const post = new Schema({

  title:String,

  content:{
    type:String,
    maxlength:600
  },

  postedby:
  {
    type:mongoose.Schema.Types.ObjectId,
    enum:['volunteer','charity']
  }
});

module.exports = mongoose.model("post", post)    