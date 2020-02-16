var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
var route=express.Router();
var app = express();


const validatecharity =require("../models/charity");
const charity= require("../models/charity")

var bodypar=bodyParser.urlencoded({ extended: true });
var middlewareBodyParser = bodyParser.json();

route.post("/signup", bodypar, async(req,res)=>{
    console.log("hey");
    // var charityModel=mongoose.model("charity")

    var {
        error
      } = validatecharity(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      const emailexist = await charity.findOne({ email: req.body.email });
      if (emailexist) {
        return res.status(400).json("email aready exists");
      }
    
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt)
    

    var new_charity=new charity()
    new_charity.name = req.body.name;
    new_charity.email = req.body.email;
    new_charity.password = hashpassword;
    new_charity.bankaccount = req.body.bankaccount;
    new_charity.country = req.body.country;
    new_charity.address = req.body.address;
    new_charity.phone = req.body.phone;
    new_charity.img = req.body.img;

    new_charity.save(function(err,data){
        if(!err){
            console.log("save....");
            res.json(data)
            console.log(data);
        }else{
            console.log(err)
        };
    })
})
module.exports=route;