const {mongoose} = require('./../../db/mongoose_config');
const {Todo} = require('./../../models/Todo');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const HttpStatus = require('http-status-codes');

module.exports.getTodos = async (req, res) => {
  Todo.find().then((todos) => {
    res.status(HttpStatus.OK).send({todos});
  }, (e) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        description: "We could not able to retrive any Todos for now."
    });
  });
}

module.exports.getTodosbyID = async (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(HttpStatus.NOT_FOUND)
    .send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      description: "Please check your Object ID"
    });
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not find any element for this ID"
      });
    }
    res.send({todo});
  }).catch((e) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      description: "Server Error occured, please retry"
    });
  });
}

module.exports.addTodo = async (req, res) => {
  let newTodo = new Todo ({
    text: req.body.text
  });
  newTodo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, we could not able to add TODO"
    });
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, we could not able to add TODO"
    });
  });
}

module.exports.deleteTodobyID = async (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, the Object ID is invalid"
    });
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not find any element for this ID"
      });
    }

    res.send({todo});
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please try again, we could not able to remove any Todo now."
    });
  });
}

module.exports.patchTodobyID = async (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'Completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(HttpStatus.NOT_FOUND).send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      description: "The Object id Looks invalid"
    });
  }

  if (_.isBoolean(body.Completed) && body.Completed) {
    body.CompletedAt = new Date().getTime();
  } else {
    body.Completed = false;
    body.CompletedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not update any element for this ID"
      });
    }
    res.send({todo});
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please try again, we could not able to update any Todo now."
    });
  })
}
