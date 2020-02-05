var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var posts = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    minlength: 20,
    maxlength: 600,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'authortype'

  },
  authortype: {
    type: String,
    required: true,
    enum: ['charity', '.....']
  }




});

function validateposts(post) {
  var schema = {
    content: joi.string().min(20).max(600).required(),

  };
  return joi.validateposts(post, schema)
}

exports.validate = validateposts;
module.exports = mongoose.model('posts', posts);
