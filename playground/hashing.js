// V1

// const {SHA256} = require('crypto-js');
//
// var message = 'I am user number 3';
// var Hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${Hash}`);
//
// var data = {
//   id: 4
// };
//
//  var token = {
//    data: data,
//    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// // testing to ensure that the hash cant be manipulated given that we are
// // now salting the hash - salting = the addition of 'somesecret' to the hash
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// }else {
//   console.log('data was changed - dont trust');
// }

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';
// bcrypt.genSalt(10,(err,salt) => {
//   bcrypt.hash(password,salt,(err, hash) => {
//     console.log(hash);
//   })
// });

var hashedPassword = '$2a$10$RbmPUfMUTUH5LEwChcz/g.D5k335xNu4w4oVypzDvy2GVSKEAk4gi';

bcrypt.compare(password,hashedPassword,(err,res) => {
  console.log(res);
});

//
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data,'123abc');
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc');
// console.log('decoded', decoded);
