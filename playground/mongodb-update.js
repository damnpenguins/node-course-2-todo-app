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

//   db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID('5976fde4fa68f59bd87819c0')
//   },{
//     // $set is an update operator it wiouldnt work otherwise
//     $set:{
//       completed: true
//     }
//   },{
//     // ssetting this flag means we caan validate the new result rather than retiurning the original record
//   returnOriginal:false
// }).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5976ffc4fa68f59bd8781ab8')
},{
  // $set is an update operator it wiouldnt work otherwise
  $set:{name: 'Cameron'},
  // $inc has to be called outside of $set
  $inc: {age:1}
},{
  // ssetting this flag means we caan validate the new result rather than retiurning the original record
returnOriginal:false
}).then((result) => {
console.log(result);
});


  // db.close();
});

//
// "text" : "Walk the dog",
// "completed" : true
