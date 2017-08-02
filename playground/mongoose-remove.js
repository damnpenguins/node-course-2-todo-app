
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

// es6 destructuring
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });


// Todo.findOneAndRemove();

// Todo.findByIdAndRemove();

Todo.findByIdAndRemove('5981dcf181c1409961b15986').then((todo) => {
  console.log(todo);
});
