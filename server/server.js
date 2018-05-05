var express = require('express');
var bodyParser = require('body-parser');

// var mongoose =  require('mongoose');
var {mongoose} = require('./db/mongoose_config');
var {User} = require('./models/Users');
 var {Todo} = require('./models/Todo');

var app = express();

//middleware helps make the body of the request into JSON
app.use(bodyParser.json());

app.post('/todo', (request, response) => {
    var newTodo = new Todo ({
      text: request.body.text
    });
    newTodo.save().then((doc) => {
      response.send(doc);
      console.log ('inserted');
    }, (e) => {
      response.status(400).send(e);
    });
});
app.post('/user', (request, response) => {
    var newTodo = new User ({
      email: request.body.email
    });
    newTodo.save().then((doc) => {
      response.send(doc);
      console.log ('inserted');
    }, (e) => {
      response.status(400).send(e);
    });
})


app.listen(3000, ()=>{
  console.log('Server started in port 3000');
});

module.exports = {app};
