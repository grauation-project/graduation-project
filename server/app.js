const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
var router = express.Router();
var bodyparser = require("body-parser");
// var error = require("./middleware/error");

require("express-async-errors");
var winston = require("winston");

var hpp = require("hpp");
var ratelimit = require("express-rate-limit");
var bodyParser = require("body-parser");

var helmet = require("helmet");
var fs = require("fs");
var mongosanatize = require("express-mongo-sanitize");
var xss = require("xss-clean");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const login = require("./controllers/login");
var donatematerial = require("./controllers/donate material");
var admin = require("./controllers/admin")
const volunteer = require("./controllers/volunteer");
var charityController = require("./controllers/charity");
const donateonline =require("./controllers/donationone");
const post=require("./controllers/posts")
const postModel=require('./models/post');
const voluntermodel=require("./models/volunteer");
const charity =require("./models/charity")
winston.configure({
  transports: [
    new winston.transports.File({
      filename: "logfile.log"
    })
  ]
});
app.use(cors());
app.use(bodyParser.json());
var files_arr = fs.readdirSync(__dirname + "/models");
files_arr.forEach(function (file) {
  require(__dirname + "/models/" + file);
});

var limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip,Please try again in an hour !"
});

// limit number of requests from the same ip address
app.use("/savethem", limiter);
// http security headers
app.use(helmet());
// data sanitization against nosql query injection
app.use(mongosanatize());
// data sanitization against xss
app.use(xss());
// prevent parameter pollution
app.use(hpp());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, HEAD, GET, OPTIONS, POST, PUT"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/charity", charityController);
app.use("/donate",donatematerial)
app.use("/login", login);
app.use("/savethem", donateonline);
app.use("/volunteer", volunteer);
app.use("/admin", admin);
app.use("/post",post)
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://mona:123456aa@graduationsite-gnpxx.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});
var parseUrlencoded= bodyParser.urlencoded({extended:true});

// posts

io.on("connection", (socket) => {
  console.log("new user connected");
  postModel.find({},(err,allpost)=>{
    if(err){
        console.log(err)
    }
    else{
        io.emit("allPost",allpost)
        // console.log(allpost)
    }
  });


  socket.on('disconnect',()=>{
    console.log('disconnect')});

socket.on('create post',function(data){
  console.log(data)

  // router.post('/post/:id',parseUrlencoded,(req,res)=>{
    console.log('hi')
      createPost = new postModel({
          title:data.title,
          content:data.content,
          // postedby:data.params.id
    
      }) 
      createPost.save((err,data)=>{
        if(!err){
          console.log("save....");
          postModel.find({}).populate('postedby.volunteer || postedby.charity').exec(function(err,post){
            console.log(post)
             

            postModel.find({},(err,allpost)=>{
              if(err){
                  console.log(err)
              }
              else{
                  io.emit("allPost",allpost)
                  console.log(allpost)
              }
            })
            
          })
        }
    })
    });

  // });
});



server.listen(3000, function () {
  console.log("server running....");
});
