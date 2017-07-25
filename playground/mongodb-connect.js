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
  //
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     console.log('Unable to insert Todo');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'damnpenguins',
  //   age: 42,
  //   location: 'Sydney'
  // }, (err, result) => {
  //   if (err) {
  //     console.log('Unable to insert new User', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


  db.close();
});
