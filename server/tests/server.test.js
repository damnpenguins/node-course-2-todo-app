const expect = require('expect');
const request = require('supertest');

var {
  app
} = require('./../server');
const {
  Todo
} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});


describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    var text = 'test Value';

    request(app) // request the express app object
      .post('/todos') //post data to the todos route
      .send({ // send the json text
        text
      })
      .expect(200) //expect a 200 status ret from the server
      .expect((res) => {
        expect(res.body.text).toBe(text); // expect the retval text property to be the sdame as the stub passed to the test
      })
      .end((err, res) => {
        if (err) {
          return done(err); // done closes the test off
        }
        Todo.find().then((todos) => { // .then = promise
          expect(todos.length).toBe(1);  // test for length 1 of ret results
          expect(todos[0].text).toBe(text); //expect the text to match
          done(); // close out of test
        }).catch((e) => done(e)); // on error do the same - close out of the test
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)          // request the express app object
      .post('/todos')     // make a post req to the todos route
      .send({})           // send an empty object to the todo save func
      .expect(400)        // expect a 400 bad req eturn val
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0); // check that the lendth of the TODOs doc is 0 as it should not have saved
          done();
        }).catch((e) => done(e));
      });
  });

});
