require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

// var mongoose =  require('mongoose');
var {mongoose} = require('./db/mongoose_config');
var {User} = require('./models/Users');
 var {Todo} = require('./models/Todo');
const {ObjectID} = require('mongodb');

var app = express();
//port dynamic for heroku
const port = process.env.PORT || 3000;

//middleware helps make the body of the request into JSON
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    console.log('request came');
    var newTodo = new Todo ({
      text: request.body.text
    });
    newTodo.save().then((doc) => {
      response.send(doc);
      console.log ('inserted');
    }, (e) => {
      response.status(400).send(e);
    }).catch((e) => {response.status(400).send(e)});;
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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'Completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.Completed) && body.Completed) {
    body.CompletedAt = new Date().getTime();
  } else {
    body.Completed = false;
    body.CompletedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
