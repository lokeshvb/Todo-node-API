var mongoose = require('mongoose');

//setting our own intrested promise constructor, we can use anything here, like bluebird
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApplication');

// if the property and var we export both have same name, we can use the following syntax
module.exports = {mongoose};
