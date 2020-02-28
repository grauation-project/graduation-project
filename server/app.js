const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var config = require("config")

var Strategy = require('passport-facebook').Strategy;
var passport = require('passport');
var session = require("session");
// var error = require("./middleware/error");
var donatepayment = require("./controllers/donationone");
var donatematerial = require("./controllers/donate material")
var admin = require("./controllers/admin");
var needs = require("./controllers/needs")
require("express-async-errors");
var winston = require("winston");

var hpp = require("hpp");
var ratelimit = require("express-rate-limit");
var bodyParser = require("body-parser");

var helmet = require("helmet");
var fs = require("fs");
var mongosanatize = require("express-mongo-sanitize");
var xss = require("xss-clean");
var charityController = require("./controllers/charity");
const app = express();



const login = require("./controllers/login");
var donatematerial = require("./controllers/donate material");
var admin = require("./controllers/admin")
const volunteer = require("./controllers/volunteer");
var charityController = require("./controllers/charity");
const donateonline =require("./controllers/donationone");
var searchController = require("./controllers/search");

winston.configure({
  transports: [
    new winston.transports.File({
      filename: "logfile.log"
    })
  ]
});

if (!config.get("jwtprivatekey")) {
  console.error("jwtprivatekey undefined");
  process.exit(1);
}
app.use(express.static("upload"));
app.use(cors());
app.use(bodyParser.json());
// app.use(passport.intialize());
// app.use(passport.session())
var files_arr = fs.readdirSync(__dirname + "/models");
files_arr.forEach(function (file) {
  require(__dirname + "/models/" + file);
});

// var limiter = ratelimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this ip,Please try again in an hour !"
// });

// limit number of requests from the same ip address
// app.use("/savethem", limiter);
// http security headers
app.use(helmet());
// data sanitization against nosql query injection
app.use(mongosanatize());
// data sanitization against xss
app.use(xss());
// prevent parameter pollution
app.use(hpp());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, HEAD, GET, OPTIONS, POST, PUT"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/search", searchController);






app.use("/savethem/charity", charityController);

app.use("/savethem/login", login);
app.use("/savethem/donatepayment", donatepayment);
app.use("/savethem/volunteer", volunteer);
app.use("/savethem/admin", admin);
app.use("/donate", donatematerial);
app.use("/savethem/needs",needs)
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://mona:123456aa@graduationsite-gnpxx.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});



passport.use(
  new Strategy({
      clientID: 799856253853537,
      clientSecret: 'a1a57004dbdefed95f388a9a402a621f',
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({
          facebookId: profile.id
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.listen(3000, function () {
  console.log("server running....");
});
