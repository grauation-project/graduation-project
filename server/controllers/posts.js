var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var bcrypt = require("bcryptjs");
var bodypar=bodyParser.urlencoded({ extended: true });

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const post=require('../models/post');
const volunteer=require("../models/volunteer");
const charity =require("../models/charity")




router.post('/create/:id',bodypar,(req,res)=>{
console.log('hi')
  createPost = new post({
      title:req.body.title,
      content:req.body.content,
      postedby:req.params.id

  }) 
  createPost.save((err,data)=>{
    if(!err){
      console.log("save....");
      post.find({}).populate('postedby.volunteer || postedby.charity').exec(function(err,post){
        console.log(post)
        res.send(post)
      })
    }
})
});


      

// router.delete('/delete/:id',(req,res)=>{
//     post.deleteOne({ _id:req.params.id},(err,data)=>{
//         if(err){
//              console.log(err)
//         }
//         else{
//             console.log("delete")
//         }
//     })
     
// })
// router.update('/edit',(req,res)=>{})



module.exports = router;