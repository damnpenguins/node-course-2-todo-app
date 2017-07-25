const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

// es6 destructuring
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();

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


app.listen(3000,() => {
  console.log('started listening on port 3000');
});

module.exports = {app};
