require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// es6 destructuring
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/todos', authenticate, (req, res) => {
  console.log(req.body);

  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {

    Todo.find({
      _creator:req.user._id
    }).then((todos) => {
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

app.get('/todos/:id', authenticate,(req, res) => {
  //res.send(req.params);
  var id = req.params.id;
  // var id =
  if (!ObjectID.isValid(id)) {
    // use return to finish execution of the function
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator:req.user._id
  }).then((todo) => {
    // if statement to handle null ret val
    if (!todo) {
      // use return to finish execution of the function
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(404).send());
});

app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)) {
    // not valid? 404
    // use return becuase we want to get out of the function
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id:id,
    _creator: req.user.id
  }).then((todo) => {
    if (!todo) {
      // no doc returned therefore failure of remove cmd
      return res.status(404).send('nope');
    }
        res.status(200).send({todo});

  }).catch((e) => {
    console.log('Operation failed');
    return res.status(400).send();
  });
});

app.patch('/todos/:id', authenticate,(req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);


  console.log( body   + ' ' + body.text + ' ' + body.completed );
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user.id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   var body = _.pick(req.body, ['email', 'password']);
//   var user = new User({
//     email: body.email,
//     password: body.password
//   });
//   user.save().then((doc) => {
//     res.status(200).send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

// app.post('/users',(req,res) => {
//   var body = _.pick(req.body, ['email', 'password']);
//   // instead of my code above, we already have the body object,
//   // so no need to creeate a new object when you already have it
//   // niccely packaged up
//   var user = new User(body);
//
//     user.save().then(() => {
//       return user.generateAuthToken();
//       // res.status(200).send(user);
//     }).then((token) => {
//       res.header('x-auth',token).send(user);
//     }).catch (e) => {
//       res.status(400).send(e);
//     })
// });

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    console.log({user});
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});





app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


// app.post('/users/login' ,(req, res) => {
//    var body = _.pick(req.body, ['email', 'password']);
//
//    User.findByCredentials(body.email,body.password).then((user) => {
//       user.generateAuthToken().then((token) => {
//         res.header('x-auth', token).send(user);
//       });
//    }).catch((err) => {
//      res.status(400).send();
//    });
//
//   //  var email = req.body.email;
//   //  var password = req.body.email;
//    //
//   //  res.send(body);
//
// });

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});


// POST /users/logout {email, password}
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
});



app.listen(port,() => {
  console.log(`started listening on port ${port}`);
});


module.exports = {app};
