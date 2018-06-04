const {mongoose} = require('./../../db/mongoose_config');
const {Book} = require('./../../models/Book');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const HttpStatus = require('http-status-codes');

module.exports.getBooks = async (req, res) => {
  Book.find().then((Books) => {
    res.status(HttpStatus.OK).send({Books});
  }, (e) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: "We could not able to retrive any Books for now."
    });
  });
}

module.exports.getBookbyID = async (req, res) => {
  let id = req.params.bookid;

  if (!ObjectID.isValid(id)) {
    return res.status(HttpStatus.NOT_FOUND)
    .send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      description: "Please check your Object ID"
    });
  }

  Book.findById(id).then((Book) => {
    if (!Book) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not find any element for this ID"
      });
    }
    res.send({Book});
  }).catch((e) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      description: "Server Error occured, please retry"
    });
  });
}

module.exports.addBook = async (req, res) => {
  let newBook = new Book ({
    name: req.body.name,
    author: req.body.author,
    isbn: req.body.isbn,
    price: req.body.price
  });
  newBook.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, we could not able to add Book"
    });
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, we could not able to create Book"
    });
  });
}

module.exports.deleteBookbyID = async (req, res) => {
  let bookid = req.params.bookid;
  if (!ObjectID.isValid(bookid)) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, the Object ID is invalid"
    });
  }

  Book.findByIdAndRemove(bookid).then((Book) => {
    if (!Book) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not find any element for this ID"
      });
    }

    res.send({Book});
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please try again, we could not able to remove any Book now."
    });
  });
}

module.exports.patchBookbyID = async (req, res) => {
  let bookid = req.params.bookid;
  let body = _.pick(req.body, ['name', 'isbn', 'author', 'price']);

  if (!ObjectID.isValid(bookid)) {
    return res.status(HttpStatus.NOT_FOUND).send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      description: "The Object id Looks invalid"
    });
  }

  Book.findByIdAndUpdate(bookid, {$set: body}, {new: true}).then((Book) => {
    if (!Book) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not update any element for this ID"
      });
    }
    res.send({Book});
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please try again, we could not able to update any Book now."
    });
  })
}
