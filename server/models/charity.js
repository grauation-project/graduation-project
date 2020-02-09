const mongoose = require("mongoose")
const Joi = require("joi");

const Schema = mongoose.Schema
const charityschema = new Schema({
    name:
    {
        type:String,
        required:true,
        max:25

    },
    img:
    {
        type:String
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        max:225

    },
    password:
    {
        type:String,
        required:true,
        min:8,
        max:16
    },
    phone:
    {
        type:Number,
        required:true,
        max:10
       
    },
    bankaccount:
    {
        type:Number,
        unique:true

    },
    address:
         {
             type:String,
             required:true
            },
    country:
         {
           type:String,
           required:true,
         }
})

const charityvalidation= (data)=>{
    const schema = Joi.object({
        name : Joi.string().min(25).required(),
        img: Joi.string(),
        email: Joi.string().required().unique().max(225),
        password: Joi.string().required().min(8).max(16),
        phone: Joi.Number().required().max(10),
        bankaccount: Joi.Number().required().unique(),
        country: Joi.string().required(),
        address: Joi.string().required()
    
    });
   return schema.validate(data)
};

module.exports = mongoose.model("charity", charityschema)

module.exports.charityvalidation=charityvalidation
