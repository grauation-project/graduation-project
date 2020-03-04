var jwt = require("jsonwebtoken")
var config = require("config")

var {
  volunteer
} = require("../models/volunteer")
var {
  charity
} = require("../models/charity")
var {
  admin
} = require("../models/admin")

function auth(req, resp, next) {
  try {
    var token = req.header('x_auth_token_charity');
    if (!token) {
      token = req.header('x_auth_token_admin');
      if (!token) {
        token = req.header('x_auth_token_volunteer');
        if (!token) {
          resp.status(401).send("you are not logged in .")

        } else {

          var decoded = jwt.verify(token, config.get('jwtprivatekey'));
          req.volunteer = decoded;
          var freshuser = volunteer.findById(decoded._id);
          if (!freshuser) {
            resp.status(401).send("token is no longer exsist.")

          }
          next();

        }

      } else {

        var decoded = jwt.verify(token, config.get('jwtprivatekey'));
        req.admin = decoded;
        var freshuser = admin.findById(decoded._id);
        if (!freshuser) {
          resp.status(401).send("token is no longer exsist.")

        }
        next();


      }



    } else {

      var decoded = jwt.verify(token, config.get('jwtprivatekey'));
      req.charity = decoded;
      var freshuser = charity.findById(decoded._id);
      if (!freshuser) {
        resp.status(401).send("token is no longer exsist.")

      }
      next();
    }
  } catch (err) {
    resp.status(400).send('invalid token')
  }
}
module.exports = auth;
