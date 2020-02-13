var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();   
var parseUrlencoded= bodyParser.urlencoded({extended:true});
// app.use(bodyParser.urlencoded({useNewUrlParser:true},{useUnifiedTopology:true},{extended:true}));

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// User Model 
const volunteer = require('../models/volunteer');
const charity = require('../models/charity');
const admin = require('../models/admin');

route.post('/login',parseUrlencoded, (req, res, next) => {
  const {email,password} = req.body
  // console.log(req.body)
  // console.log("asd")
  login.findOne({
    email: email
  })
  .then(login => {
    console.log(login)
    if (!login) {
      res.status(501).json({Msg :'Email Not Registered'});
    }

    // Match password
    // bcrypt.compare(password, login.password, (err, isMatch) => {
    //   if (isMatch) {
    //     let token = jwt.sign({email : login.email},'Secret',{expiresIn:'3h'})
    //     res.status(200).json(token);
    //   } else {
    //     res.status(501).json({Msg :'Password Does not Match'});
   
    //   }
    // });
  });  


});
module.exports=route;

