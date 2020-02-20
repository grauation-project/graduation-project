var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();   
var parseUrlencoded= bodyParser.urlencoded({extended:true});
const volunteer = require('../models/volunteer');
const charity = require('../models/charity');

route.get('/charity',parseUrlencoded,(req,res)=>{
    // console.log('tag')
    charity.findOne({name:req.body.name},(err,data)=>{
        // console.log('tag', '1')
        if (err){
            console.log(err)
        }
        else{

            // console.log(data)
            res.json(data)
        }
    })
   
}

//   .then(item => {
//     console.log(item)
//   })
//   .catch(err => {
//   console.error(err)
//   })
);
module.exports=route;
