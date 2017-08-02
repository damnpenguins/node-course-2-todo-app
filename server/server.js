const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

// es6 destructuring
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {
      res.send({todos});
      // NOTE: send an object rather than the todos array
      // this is so that you can add other props to the return Value
      // like this
      // res.send({
      //   todos,
      //   otherKey: 'anotherVal',
      //   otherKeyAgain: 'anotherValAgain',
      // })
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    // use return to finish execution of the function
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    // if statement to handle null ret val
    if (!todo) {
      // use return to finish execution of the function
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(404).send());
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)) {
    // not valid? 404
    // use return becuase we want to get out of the function
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      // no doc returned therefore failure of remove cmd
      return res.status(404).send('nope');
    }
        res.status(200).send({todo});

  }).catch((e) => {
    console.log('Operation failed');
    return res.status(400).send();
  });
  // remove todo ByID
    // success
      // if no doc then send 404
      // if doc then send 200 and doc
    // error
});




app.listen(port,() => {
  console.log(`started listening on port ${port}`);
});

module.exports = {app};
