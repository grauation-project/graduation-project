var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var donationmaterial = new Schema({
    donor: {
        type: String,
        minlength: 3,
        maxlength: 55,
        required: true
    },
    phone: {
        type: String,
        minlength: 11,
        maxlength: 15,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255,
        lowercase: true,
        required: true
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 200,
        required: true,
    },
    createdat: {
        type: Date
    },
    charityname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
    },
    type: String
});

function validatedonation(donation) {
    var schema = {
        donor: joi.string().min(3).max(55).required(),
        donorcreditnum: joi.Number().min(15).max(15).required(),
        phone: joi.String().min(11).max(15).required(),
        type: joi.String().required()
    };
    return joi.validate(donation, schema)
}

exports.validate = validatedonation;
// exports.users = users;

module.exports = mongoose.model('donationmaterial', donationmaterial);