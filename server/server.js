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



app.listen(3000,() => {
  console.log('started listening on port 3000');
});
