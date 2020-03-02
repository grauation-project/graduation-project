var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();
var app = express();
var joi = require("joi")
var config = require("config")
const nodemailer = require('nodemailer');


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

router.post("/forget/password", parseUrlencoded,async(req,res)=>{
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "savethemiti@gmail.com",
        pass: "123456789@@"
    }
});

var mailOptions={
  from :"savethemiti@gmail.com" ,
  to:req.body.email,
  subject : 'This email is from savethem website',
  html:`
  <h1 style="text-align:center;margin-bottom:20px">Reset your password?</h1>
  <h4 style="text-align:center;margin-bottom:20px">If you requested a password reset for ${req.body.email}, click the button below. 
  If you didn't make this request, ignore this email.</h4>
  <button style="background-color:#3B6D8C;margin-left:50%"><a style="text-decoration:none;background-color:#3B6D8C;color:white" href="http://localhost:4200/reset-password">Reset Password</a></button>
<p style="text-align:center">This email was meant for ${req.body.email}</p>

  `
}
console.log(mailOptions);

  let volunteers = await volunteer.findOne({
    email: req.body.email
  });

  if (!volunteers) {
    let charitiy = await charity.findOne({
      email: req.body.email
    });
    if (charitiy) {
    
      smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
              console.log(error);
          res.json(error);
        }
        else{
              console.log("Message sent: " + response.message);
          res.json("sent");
           }

          })

    } else {
      let admins = await admin.findOne({
        email: req.body.email
      });
      if (admins) {
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
                console.log(error);
            res.json(error);
          }
          else{
                console.log("Message sent: " + response.message);
            res.json("sent");
             }
  
            })

      } else {
        return res.status(400).send("invalid email or password.");

      }
    }

  } else {
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
            console.log(error);
        res.json(error);
      }
      else{
            console.log("Message sent: " + response.message);
        res.json("sent");
         }

        })
  }




})


module.exports = router;
