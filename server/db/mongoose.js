const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });
// run mongod with
// mongod --dbpath C:/Users/damnpenguins/mongo-data

module.exports = {mongoose};
