var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

var admin = new Schema({

  
  email:{
      type:String,
      required:true,
      unique:true
  },
  password:{
    type:Number,
    required:true,
    unique:true,
    minlength:6,
    maxlength:15
  }
});

mongoose.model("admin",admin);
