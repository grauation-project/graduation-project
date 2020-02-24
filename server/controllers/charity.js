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

router.get("/account/:id", auth, async (req, res) => {

  console.log("hi hi")
  let charityspec = await charity.findOne({
    _id: req.params.id
  });

  res.json(charityspec)
});

module.exports = router;
