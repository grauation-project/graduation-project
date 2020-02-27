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

})

router.get("/account/:id" , auth, async (req, res) => {

  console.log("hi hi")
  let charityspec = await charity.findOne({
    _id: req.params.id
  });

  res.json(charityspec)
});


router.post("/following/:id" , parseUrlencoded, async (req, res) => {
  console.log("asd")
  let exit = charity.findOne({following:req.body.id},function(err,data){

    if(err){
      console.log(err)
    }
  });
  if(!exit){

    charity.update({_id:req.params.id},{$push:{following:req.body.id}},(err,data)=>{
      if(err){
        console.log(err);
        
      }
      else{
        let exit1 = charity.findOne({follower:req.params.id},function(err,data){

          if(err){
            console.log(err)
          }
        
        
        })
        console.log(data);
        res.json(data)
        if(!exit1){
          console.log("follow")
          charity.update({_id:req.body.id},{$push:{follower:req.params.id.toString()}},(err,data)=>{
            if(err){
              console.log(err);
              
            }
            else{
              console.log(data);
              res.json(data)
            }
          })

        }
        else{
          res.json("you are follower")
        }
 
      }
    
    })
    
  }
else{

  res.json("sorry you are already follow this account")
}

});



module.exports = router;
