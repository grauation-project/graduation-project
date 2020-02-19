var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();
var app = express();
var joi = require("joi")
var config = require("config")


var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var passport = require('passport');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// User Model 


var {
  volunteer
} = require("../models/volunteer");
var {
  charity
} = require("../models/charity");
var {
  admin
} = require("../models/admin");
router.post('/', parseUrlencoded, async (req, res) => {

  var {
    error
  } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let volunteers = await volunteer.findOne({
    email: req.body.email
  });

  if (!volunteers) {
    let charitiy = await charity.findOne({
      email: req.body.email
    });
    if (charitiy) {
      var validepassword = await bcrypt.compare(req.body.password, charitiy.password);
      if (!validepassword) {
        return res.status(400).send("invalid email or password.");

      } else {
        console.log("you are charity")
        var token = jwt.sign({
          _id: charitiy._id
        }, config.get('jwtprivatekey'))
        res.cookie('jwt', token, {
          // secure: true,
          httpOnly: true
        })
        res.header("x_auth_token_charity", token).status(200).json({
          "charity": charitiy._id,
          "token": token,
          "name": "charitiy"
        });

      }
    } else {
      let admins = await admin.findOne({
        email: req.body.email
      });
      if (admins) {
        validepassword = await bcrypt.compare(req.body.password, admins.password);
        if (!validepassword) {
          return res.status(400).send("invalid email or password.");

        } else {
          console.log("you are admin")
          var token = jwt.sign({
            _id: admins._id
          }, config.get('jwtprivatekey'))
          res.cookie('jwt', token, {
            // secure: true,
            httpOnly: true
          })
          res.header("x_auth_token_admin", token).status(200).json({
            "admin": admins._id,

            "token": token,
            "name": "admin"
          });
        }

      } else {
        return res.status(400).send("invalid email or password.");

      }
    }

  } else {
    validepassword = await bcrypt.compare(req.body.password, volunteers.password);
    if (!validepassword) {
      return res.status(400).send("invalid email or password.");

    } else {
      console.log("you are volunteer")
      var token = jwt.sign({
        _id: volunteers._id
      }, config.get('jwtprivatekey'))
      res.cookie('jwt', token, {
        // secure: true,
        httpOnly: true
      })
      res.header("x_auth_token_volunteer", token).status(200).json({
        "token": token,
        "volunteer": volunteers._id,
        "name": "volunteer"
      });
    }
  }


})

function validate(req) {
  var schema = {
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required()
  };
  return joi.validate(req, schema)
}

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




module.exports = router;
