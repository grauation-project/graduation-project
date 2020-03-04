var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var bcrypt = require("bcryptjs");
var parseUrlencoded= bodyParser.urlencoded({extended:true});
var mongoose = require("mongoose");

const app = express();


const postModel=require('../models/post');
const voluntermodel=require("../models/volunteer");
const {charity} =require("../models/charity")

 

router.post("/update/:id",(req,res)=>{
  postModel.findByIdAndUpdate(req.params.id,
    {
      $set:{title:req.body.title,content:req.body.content}
    },
    {new :true},
    function(err,updatepost){
if(err){
}
else{
  res.json(updatepost)
}

  })
});

router.delete("/delete/:id",(req,res)=>{
  postModel.findByIdAndRemove(req.params.id,(err,deletepost)=>{
    if(err){
    }
    else{
      res.json(deletepost)
    }
  })

})


router.get("/posts/list",async(req,res)=>{

  let result = await   postModel.find({});
res.json(result)




})

router.delete("/posts/:id", function (req, resp) {

  postModel.findOneAndRemove({
      _id: req.params.id
    },
    function (err, data) {
      if (!err) {
      }
    })

  resp.json("post done")
})


module.exports = router;