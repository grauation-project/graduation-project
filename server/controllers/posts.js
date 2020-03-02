var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var bcrypt = require("bcryptjs");
var parseUrlencoded= bodyParser.urlencoded({extended:true});

const app = express();


const postModel=require('../models/post');
const voluntermodel=require("../models/volunteer");
const {charity} =require("../models/charity")

 

router.post("/update/:id",(req,res)=>{
  console.log("update")
  postModel.findByIdAndUpdate(req.params.id,
    {
      $set:{title:req.body.title,content:req.body.content}
    },
    {new :true},
    function(err,updatepost){
if(err){
  console.log(err)
}
else{
  res.json(updatepost)
}

  })
});

router.delete("/delete/:id",(req,res)=>{
  console.log("delete")
  postModel.findByIdAndRemove(req.params.id,(err,deletepost)=>{
    if(err){
      console.log(err)
    }
    else{
      res.json(deletepost)
    }
  })

})



// router.get("/charitypost/:id",(req,res)=>{
//   console.log("charity")
// postModel.findOne({postedby:req.params.id},(err,data)=>{
//   if(!err){
//     console.log(data)    
//       }
//       else{
//         console.log(charitypost)
//       }
//    })
// })


// router.get("/volunteerpost/:id",(req,res)=>{
//   console.log("volunteer")
// postModel.findOne({postedby:req.params.id},(err,data)=>{
//   if(!err){
//     console.log(data)    
//       }
//       else{
//         console.log(charitypost)
//       }
//    })
// });




// router.get("/author/:emaill",async(req,res)=>{
//   console.log(req.params.emaill)
//   let charityspec = await charity.findOne({
//     email: req.params.emaill
//   });

//   res.json(charityspec)
   
    // if(!err){
    //   charity.findOne({_id:data._id},(error,IDcharity)=>{
    //     console.log(IDcharity)  
    //   })    
    // }
    // else{
    //   console.log(error)
    // }
  // })



























// router.post('/create/:id',bodypar,(req,res)=>{
// console.log('hi')
//   createPost = new post({
//       title:req.body.title,
//       content:req.body.content,
//       postedby:req.params.id

//   }) 
//   createPost.save((err,data)=>{
//     if(!err){
//       console.log("save....");
//       post.find({}).populate('postedby.volunteer || postedby.charity').exec(function(err,post){
//         console.log(post)
//         res.send(post)
//       })
//     }
// })
// });


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