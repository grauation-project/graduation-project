var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var donationpayment = new Schema({
    donor: {
        type: String,
        minlength: 3,
        maxlength: 55,
        required: true
    },
    email:
    {
        type:String,
        maxlength:255,
        required:true,
        unique:true
    },
    donorcreditnum: {
        type: Number,
        minlength: 15,
        maxlength: 15,
        required: true,
        unique: true
    },
    country:
    {
        type:String,
        required:true,
        maxlength:50
    },
    City:
    {
        type:String,
        required:true,
        maxlength:50
    },
    PostalCode:
    {
        type:Number,
        required:true,
       
    },
    charity: {
        type: String,
        minlength: 3,
        maxlength: 55,
        required: true
    },
    charityBankAccount: {
        type: Number,
        minlength: 15,
        maxlength: 15,
        required: true,
        unique: true
    },
    // createdat: {
    //     type: Date
    // },
    amount: {
        type: Number,
        minlength: 1,
        required: true
    }
});

function validatepayment(payment) {
    var schema = {
        donor: joi.string().min(3).max(55).required(),
        email:joi.string().max(255).required().email(),
        donorcreditnum: joi.Number().min(15).max(15).required(),
        charityBankAccount: joi.Number().min(15).max(15).required(),
        amount: joi.Number().min(1).required()
    };
    return joi.validate(payment, schema)
}

exports.validate = validatepayment;
// exports.users = users;

module.exports = mongoose.model('donationpayment', donationpayment);