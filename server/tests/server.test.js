const expect = require ('expect');
const request =  require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

//can have beforeEach method here, if we want to cleanup anything after each test
describe('POST /todo', () => {
  it('Should create a new todo', (done) => {
      var text = 'write more test cases_testing purpose';

      request(app)
        .post('/todo')
        .send({ text })//it is equivalent to { text: text } es6 advandtage
        .expect(200)
        .expect((res) =>{
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          // now we need to check whether the data successfully stored in db or not.
          Todo.findOne({ 'text': 'write more test cases_testing purpose'}).then((todo_doc) => {
            expect(todo_doc.text).toBe(text);
            done();
          }).catch((e) => {
            done(e);
          });

          // //Remove the data we inserted for testing. it should be in NOOPDBtran
          // Todo.remove({'text': 'write more test cases_testing purpose'}).then((todo_doc) => {
          //   expect(todo_doc.text).toBe(text);
          //   done();
          // }).catch((e) => done(e));
        });
   });
});
