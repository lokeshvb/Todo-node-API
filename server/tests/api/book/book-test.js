const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../../../app');
const {Book} = require('./../../../models/Book');
const {Todo} = require('./../../../models/Todo');

const books = [{
  _id: new ObjectID(),
  name: 'Book 1 by author y1',
  author: 'y1',
  price: 40,
  isbn: 10,
}, {
  _id: new ObjectID(),
  name: 'Book 1 by author y2',
  author: 'y2',
  price: 50,
  isbn: 15,
}];
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: true,
  completedAt: 444444
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];
beforeEach((done) => {
  Book.remove({}).then(() => {
    return Book.insertMany(books);
  }).then(() => done());
});

describe('POST /api/books', () => {
  it('should create a new Book', (done) => {
    let tempbook = {
      _id: new ObjectID(),
      name: 'Book 2 by author y2',
      author: 'y2',
      price: 50,
      isbn: 18,
    };

    request(app)
      .post('/api/books')
      .send(tempbook)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(tempbook.name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Book.find({name: 'Book 2 by author y2'}).then((books) => {
          expect(books.length).toBe(1);
          expect(books[0].name).toBe('Book 2 by author y2');
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create book with empty body data', (done) => {
    request(app)
      .post('/api/books')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((books) => {
          expect(books.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /api/books', () => {
  it('should get all books', (done) => {
    request(app)
      .get('/api/books')
      .expect(200)
      .expect((res) => {
        expect(res.body.Books.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /api/books/:id', () => {
  it('should return book detail of the given id', (done) => {
    request(app)
      .get(`/api/books/${books[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.Book.name).toBe(books[0].name);
      })
      .end(done);
  });

  it('should return 404 if book not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/api/books/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/api/books/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /api/books/:id', () => {
  it('should remove a book of the given id', (done) => {
    var hexId = books[1]._id.toHexString();

    request(app)
      .delete(`/api/books/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.Book._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //deleted book should not have entry in DB
        Todo.findById(hexId).then((book) => {
          expect(book).toBe(null);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/api/books/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/api/books/123abc')
      .expect(400)
      .end(done);
  });
});

describe('PATCH /api/book/:id', () => {
  it('should update the book', (done) => {
    let hexId = books[0]._id.toHexString();

    request(app)
      .patch(`/api/books/${hexId}`)
      .send({
        name: 'Book 2 by author y3',
        author: 'y3',
        price: 60,
        isbn: 20,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.Book.name).toBe("Book 2 by author y3");
        expect(res.body.Book.author).toBe("y3");
        expect(res.body.Book.price).toBe(60);
      })
      .end(done);
  });
});
