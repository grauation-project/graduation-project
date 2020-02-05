const mongoose = require("mongoose")

const Schema = mongoose.Schema
const charityschema = new Schema({
  name: {
    type: String,
    required: true,
    max: 25

  },
  img: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 225

  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16
  },
  phone: {
    type: Number,
    required: true,
    max: 10

  },
  bankaccount: {
    type: Number,
    unique: true

  },
  address: {
    country: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    }

  }

})

module.exports = mongoose.model("charity", charity)
