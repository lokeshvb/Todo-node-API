var mongoose = require('mongoose');

var schema = new  mongoose.Schema({
  text: {
    type : String,
    required: true,
    minlength:1,
    trim: true,
    },
  Completed : {
    type: Boolean,
    default: false
  },
  CompletedAt : {
    type: Number,
    default: null
  }
});
var Todo = mongoose.model('ToDo', schema);

module.exports = {Todo};
