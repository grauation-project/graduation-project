<<<<<<< HEAD
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("config");
var bcrypt = require("bcryptjs");
var auth = require('../middleware/auth');

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});


var {
  validatecharity,
  charity
} = require("../models/charity");



router.post("/signup", parseUrlencoded, async (req, res, next) => {
  console.log("hey");
  var {
    error
  } = validatecharity(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let charitiy = await charity.findOne({
    email: req.body.email
  });
  if (charitiy) {
    return res.status(400).send("user already registered.");
  }


  charitiy = new charity({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bankaccount: req.body.bankaccount,
    country: req.body.country,
    address: req.body.address,
    phone: req.body.phone,
    img: req.body.img,
  });

  var salt = await bcrypt.genSalt(10);
  charitiy.password = await bcrypt.hash(charitiy.password, salt);
  await charitiy.save();
  // var token = jwt.sign({
  //     _id: charitiy._id
  //   },
  //   config.get("jwtprivatekey")
  // );
  // res.cookie('jwt', token, {
  //   // secure: true,
  //   httpOnly: true
  // })
  res.send(charitiy);

=======
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
>>>>>>> 6ad8930f7ab4a5962fa0b1c87988e3980a8782e9
})

router.get("/account/:id", auth, async (req, res) => {

  console.log("hi hi")
  let charityspec = await charity.findOne({
    _id: req.params.id
  });

  res.json(charityspec)
});

module.exports = router;
