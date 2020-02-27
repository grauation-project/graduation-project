var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var route=express.Router();
var app = express();   
var parseUrlencoded= bodyParser.urlencoded({extended:true});
const volunteer = require('../models/volunteer');
const charity = require('../models/charity');

// route.get('/charity',parseUrlencoded,(req,res)=>{
//     console.log('tag')
//     charity.findOne({name:req.body.name},(err,data)=>{
//         console.log('tag', '1')
//         if (err){
//             console.log(err)
//         }
//         else{
//             // console.log(data)
//             res.json(data)
//         }
//     })
// });
route.get('/listcharity',(req,res)=>{
    mongoose.model('charity').find().then(listcharity=>{
        res.json(listcharity)
    }).catch(err=>{
        res.json(err)
    })
})
route.get('/listvolunteer',(req,res)=>{
    mongoose.model('volunteer').find().then(listvolunteer=>{
        res.json(listvolunteer)
    }).catch(err=>{
        res.json(err)
    })
})
module.exports=route;
