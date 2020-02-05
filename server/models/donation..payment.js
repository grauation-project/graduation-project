var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var donationpayment = new Schema({
    donor: {
        type: String,
        minlength: 3,
        maxlength: 55,
        required: true
    },
    donorcreditnum: {
        type: Number,
        minlength: 15,
        maxlength: 15,
        required: true,
        unique: true
    },
    charityname: {
        type: String,
        minlength: 3,
        maxlength: 55,
        required: true
    },
    charitycreditnum: {
        type: Number,
        minlength: 15,
        maxlength: 15,
        required: true,
        unique: true
    },
    createdat: {
        type: Date
    },
    amount: {
        type: Number,
        minlength: 1,
        required: true
    }
});

function validatepayment(payment) {
    var schema = {
        donor: joi.string().min(3).max(55).required(),
        donorcreditnum: joi.Number().min(15).max(15).required(),
        charitycreditnum: joi.Number().min(15).max(15).required(),
        amount: joi.Number().min(1).required()
    };
    return joi.validate(payment, schema)
}

exports.validate = validatepayment;
// exports.users = users;

module.exports = mongoose.model('donationpayment', donationpayment);