var mongoose = require('mongoose');

var schema = new  mongoose.Schema({
  name : {
    type: String,
    default: false
  },
  author : {
    type: String,
    default: null
  },
  isbn : {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  price : {
    type: Number,
    default: 0
  }
});
var Book = mongoose.model('Book', schema);

module.exports = {Book};
