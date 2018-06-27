#Books and Notes keeping APIs

These API's helps you to store the details of the books you have. You can create, find, delete and update the details of your Books, you can create action items and store it as Notes. Once you completed action items, you can mark the Note as completed.

##Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  1) NODE v8.9.4 or above
  2) MONGODB
  3) In command prompt, in folder you wish to keep the project, run
    `git clone https://github.com/lokeshvb/Todo-node-API`
#### Installation

  #####Installing Node Packages
  1) From command prompt, run the `npm install` command
  `C:\Users\blokesh\Web_dev\NODE\Node_Todo_API>npm install`
  #####Build
  2) From command prompt, run the `npm run build` command
  `C:\Users\blokesh\Web_dev\NODE\Node_Todo_API>npm run build`
  #####Starting MongoDB database
  3)From command prompt, run the `mongod.exe --dbpath {folder path}` command with the folder path you wish to keep the mongodb data
  `C:\Program Files\MongoDB\Server\3.6\bin>mongo.exe --dbpath "C:\Users\blokesh\Mongo-Data"`
  #####Starting the app.
  4) From Command prompt, run `npm run app`. It will give the port in which app started. you can browse to that port by, localhost:{port_number}
  `C:\Users\blokesh\Web_dev\NODE\Node_Todo_API>npm run app`
  #####Running the Tests
  You can run the test cases of the app in command prompt, using `npm run test`.

  ```C:\Users\blokesh\Web_dev\NODE\Node_Todo_API>npm test

> Book-Notes_API@1.0.0 test C:\Users\blokesh\Web_dev\NODE\Node_Todo_API
> SET "NODE_ENV = test " && mocha server/**/*-test.js --timeout 5000



Started from port 3000
  POST /api/books
  √ should create a new Book (183ms)
  √ should not create book with empty body data

GET /api/books
  √ should get all books

GET /api/books/:id
  √ should return book detail of the given id
  √ should return 404 if book not found
  √ should return 404 for non-object id
  .....
  ```

  #####Running the coverage.
  `C:\Users\blokesh\Web_dev\NODE\Node_Todo_API>npm run coverage`

  #####Viewing the coverage results.
  you can find the results in browsing the file `coverage\lcov-report\index.html` in project directory.  
