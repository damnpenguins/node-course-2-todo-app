const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, { useMongoClient: true });
// run mongod with
// mongod --dbpath C:/Users/damnpenguins/mongo-data

module.exports = {mongoose};
