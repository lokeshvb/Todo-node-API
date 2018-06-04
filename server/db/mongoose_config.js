const mongoose = require('mongoose');
const config = require('./../utils/config');

//setting our own intrested promise constructor, we can use anything here, like bluebird
mongoose.Promise = global.Promise;

mongoose.connect(config.get('mongodb_uri'));

// if the property and var we export both have same name, we can use the following syntax
module.exports = {mongoose};
