// const MongoClient = require('mongodb').MongoClient;

// es6 object destructuring
// this is a way you can get mongoDB to create OBJ ID's for you
const {MongoClient,ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // deleteMany users
//   db.collection('Users').deleteMany({name: 'damnpenguins'}).then((result) => {
//     console.log(result);
//   });
//
// //findOneAndDelete users
//   db.collection('Users').findOneAndDelete({
//     _id: new ObjectID('5976ff42fa68f59bd8781a71')
//   }).then((result) => {
//     console.log(result);
//   });




  // db.close();
});

//
// "text" : "Walk the dog",
// "completed" : true
