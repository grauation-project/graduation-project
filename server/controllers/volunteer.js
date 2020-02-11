var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();   
var parseUrlencoded= bodyParser.urlencoded({extended:true});
// app.use(bodyParser.urlencoded({useNewUrlParser:true},{useUnifiedTopology:true},{extended:true}));

route.post("/signup",parseUrlencoded,function(Request,response){
var volunteersignupmodel=mongoose.model("volunteer");
  var volunteer=new volunteersignupmodel()
  volunteer.fname=Request.body.fname;
  volunteer.lname=Request.body.lname;
  volunteer.email=Request.body.email;
  volunteer.password=Request.body.password;
  volunteer.Age=Request.body.Age;
  volunteer.phone=Request.body.phone;
  volunteer.country=Request.body.country;
  volunteer.img=Request.body.img;

  volunteer.save(function(err,data){
  response.json(data);
  console.log(data);
})
// response.status(200).json({
    // messsage:"test"
// })

})

module.exports=route;
