var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
var route=express.Router();
var app = express(); 

const validateVolunter =require("../models/volunteer")
const volunteer=require("../models/volunteer")

var parseUrlencoded= bodyParser.urlencoded({extended:true});
// app.use(bodyParser.urlencoded({useNewUrlParser:true},{useUnifiedTopology:true},{extended:true}));

route.post("/signup",parseUrlencoded,async(req,res)=>{

  const { error } = validateVolunter(req.body);
  if (error){
    return res.status(400).send(error.details[0].message)
  } 
  const emailexist = await volunteer.findOne({ email: req.body.email });
  if (emailexist) {
    return res.status(400).json({msg:"email aready exists"});
  }
  const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt)


  var volunteersignup=new volunteer()
  volunteersignup.fname=req.body.fname;
  volunteersignup.lname=req.body.lname;
  volunteersignup.email=req.body.email;
  volunteersignup.password=hashpassword;
  volunteersignup.Age=req.body.Age;
  volunteersignup.phone=req.body.phone;
  volunteersignup.country=req.body.country;
  volunteersignup.img=req.body.img;

  volunteersignup.save(function(err,data){
    if(err){
      console.log(err)
    }
    else{
      res.json(data);
      console.log(data);
    }
  })
});

  

module.exports=route;
