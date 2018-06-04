const express = require('express');

const { getTodos, getTodosbyID } = require('./todo/todo-controller');
const { addTodo } = require('./todo/todo-controller');
const { deleteTodobyID } = require('./todo/todo-controller');
const { patchTodobyID } = require('./todo/todo-controller');
const { getBooks, getBookbyID } = require('./Book/book-controller');
const { addBook } = require('./Book/book-controller');
const { deleteBookbyID } = require('./Book/book-controller');
const { patchBookbyID } = require('./Book/book-controller');


const getRoutes = () => ({
  '/api/todos': [ getTodos ],
  '/api/todos/:id': [ getTodosbyID ],
  '/api/books': [ getBooks ],
  '/api/books/:bookid': [ getBookbyID ]
});

const postRoutes = () => ({
  '/api/todos': [ addTodo ],
  '/api/books': [ addBook ]
});

const deleteRoutes = () => ({
  '/api/todos/:id': [ deleteTodobyID ],
  '/api/books/:bookid' : [ deleteBookbyID ]
});

const patchRoutes = () => ({
  '/api/todos/:id': [ patchTodobyID ],
  '/api/books/:bookid': [ patchBookbyID ]
})

const routes = () => ({
  post: postRoutes(),
  get: getRoutes(),
  delete: deleteRoutes(),
  patch: patchRoutes()
});

module.exports.setup = function () {

  const router = express.Router();
  Object.entries(routes()).forEach(([ type, routelist ]) => {
    Object.entries(routelist).forEach(([ key, value ]) => {
      if (type === 'get') {
        router.get(key, value);
      }
      else if (type === 'post') {
        router.post(key, value);
      }
      else if (type === 'delete') {
        router.delete(key, value);
      }
      else if (type === 'patch') {
        router.patch(key, value);
      }
    });
  });

  return router;
};
