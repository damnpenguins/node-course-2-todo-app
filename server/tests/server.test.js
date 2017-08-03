const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});


describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    var text = 'test Value';

    request(app) // request the express app object
      .post('/todos') //post data to the todos route
      .send({text}) // send the json text
      .expect(200) //expect a 200 status ret from the server
      .expect((res) => {
        expect(res.body.text).toBe(text); // expect the retval text property to be the sdame as the stub passed to the test
      })
      .end((err, res) => {
        if (err) {
          return done(err); // done closes the test off
        }
        Todo.find({text}).then((todos) => { // .then = promise
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
          expect(todos.length).toBe(2); // check that the lendth of the TODOs doc is 0 as it should not have saved
          done();
        }).catch((e) => done(e));
      });
  });


});

//// OK so here we go, we run the request with app to get express going
  // we then request the get route of todos
  // and check that the res was 200
  // and that we have 2 entries, that we stubbed up above with the todos obj array
describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  })
});


describe('GET /todos/:id', () => {
  // async call so send done to note when test finishes
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  })

  it('should return a 404 if todo not found',(done) => {
    var testID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${testID}`)
      .expect(404)
      .end(done)
  })

  it('should return a 404 for non-object IDs',(done) => {
    var testID = 123;
    request(app)
    .get(`/todos/${testID}`)
    .expect(404)
    .end(done)
  })
});


describe('DELETE /todos/:id', (done) => {

  it('Should delete a todo', (done) => {
    // grab ID of second stub json object
    var hexId = todos[1]._id.toHexString();

    // request the app, run delete path, test returned deleted object ID
    // to ensure it was the right one
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err,res) => {
      if (err) {
        return done(err);
      }

      // finally we test that the remove process worked
      // by actually checking the db for the deleted object
       Todo.findById(hexId).then((todo) => {
         expect(todo).toNotExist();
         done();
       }).catch((e) => done(e));
    });

  });
  //
  it('Should return a 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
   });

  it('Should return a 404 if ObjectID is inValid', (done) => {
    var testID = 123;
    request(app)
    .delete(`/todos/${testID}`)
    .expect(404)
    .end(done)
  });

});

describe('PATCH /todos/:id', (done) => {

    //set first todo completed to true
    it('should change the first todo', (done) => {
      // grab id of first TODO update text
      var id = todos[0]._id.toHexString();
      var txt = 'This is different text';
      request(app)
      .patch(`/todos/${id}`)
      // expect 200
      .send({
        completed:true,
        text: txt
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(txt);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
      // text is changed. copmpleted is true, completedAt is a number .toBeA
    });
    // set second todo value to false and completedAAt to false
    // grab id of ssecond // TODO:
    // update text set complete to false
    // expect 200
    // text is changed complete is false completedAt is null .toNotExist
    //set first todo completed to true

    it('should change the second todo', (done) => {
      // grab id of first TODO update text
      var id = todos[1]._id.toHexString();
      var txt = 'This is different text again';
      request(app)
      .patch(`/todos/${id}`)
      // expect 200
      .send({
        completed:false,
        text: txt
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(txt);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)
    });
});
