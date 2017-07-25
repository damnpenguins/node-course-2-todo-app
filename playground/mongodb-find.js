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
  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });
  // db.collection('Todos').find({
  //   // pasting the ID string into the query wouldnt work as it requires an ObjectID
  //   // so therefore we need to use the ObjectID method to construct
  //   // the object from the string
  //   _id: new ObjectID('5976edfdfa68f59bd8781477')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').count().then((count) => {
  //   console.log('Todos');
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  db.collection('Users').find({name: 'damnpenguins'}).toArray().then((docs) => {
    console.log('Users');
    console.log(`${docs.length} Users found with that name`);
    console.log(JSON.stringify(docs, undefined,2));
  }, (err) => {
    console.log('Unable to fetch Users', err);
  });




  // db.close();
});
