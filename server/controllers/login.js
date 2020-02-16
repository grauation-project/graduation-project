var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();   
var parseUrlencoded= bodyParser.urlencoded({extended:true});

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

 
const volunteer = require('../models/volunteer');
const charity = require('../models/charity');
const admin = require('../models/admin');
const user=require("../models/user");

route.post('/save',parseUrlencoded, async(req, res, next) => {
  
  var email = req.body.email
    console.log(email);



    // if 
  //   charity.findOne({email:req.body.email})
  //   if(!charity){
  //     volunteer.findOne({email:req.body.email})
  //   }
  //   else if(!volunteer){
  //     admin.findOne({email:req.body.email})
  //   }
  // else if(!admin){
  //   console.log('Email Not Registered')
  //   res.status(501).json({Msg :'Email Not Registered'})
  // }
  //   else{
  //     bcrypt.compare(req.body.password, volunteer.password, (err, match) => {
  //       if (match) {
  //         console.log("login");
  //       }
  //       console.log(err);
  //     })
  //   }

});
module.exports=route;

