const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
// es6 destructuring
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '597747827eb6b60bdc4f9af11';


// ====
// Todos section


// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id:id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
//
// // most of the time use findOne as it fails better
// // you get a null val passed back rather than a null array
// Todo.findOne({
//   _id:id
// }).then((todo) => {
//   // if statement to handle null ret val
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo', todo);
// });
//
// if you are looking up a  single record by ID use this call rather than find one
// but uf you are looking on another field onter than id usefindOne for the
// afforementioned reasons
// Todo.findById(id).then((todo) => {
//   // if statement to handle null ret val
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By ID', todo);
// }).catch((e) => console.log(e));

// =====
// users section

var userID = "59771ee47c0a85133858a691";

User.findById(userID).then((user) => {
  // if statement to handle null ret val
  if (!user) {
    return console.log('Unable to find the User');
  }
  console.log(JSON.stringify(user));
}).catch((e) => console.log(e));
