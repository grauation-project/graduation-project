var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// var middlewareBodyParser = bodyParser.json();
var parseUrlencoded= bodyParser.urlencoded({extended:true});

route.post("/signup", parseUrlencoded, function(req,res){
    var charityModel=mongoose.model("charity")
    var new_charity=new charityModel()
    new_charity.name = req.body.name;
    new_charity.email = req.body.email;
    new_charity.password = req.body.password;
    new_charity.bankaccount = req.body.bankaccount;
    new_charity.country = req.body.country;
    new_charity.address = req.body.address;
    new_charity.phone = req.body.phone;
    new_charity.img = req.body.img;

    new_charity.save(function(err,data){
        // if(!err){
        //     console.log("save....");
        //     res.json(data)
        // }else{
        //     console.log(err)
        // }
        console.log(err)
        res.json(data);
        console.log(data);
    })
})
module.exports=route;