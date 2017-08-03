// const mongoose = require('mongoose');
// const validator = require('validator');
//
// var UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true,
//     unique: true,
//     validate: {
//       isAsync: true,
//       validator: validator.isEmail,
//       message: `{VALUE} is not a valid email`
//     },
//   },
//   password: {
//     type: String,
//     require: true,
//     minlength: 6
//   },
//   tokens: [{
//     access: {
//       type: String,
//       required: true
//     },
//     token: {
//       type: String,
//       required: true
//     }
//   }]
// });
//
// UserSchema.methods.generateAuthToken = function () {
//   var user = this;
//   var access = 'auth';
//   var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
//
//   user.tokens.push({access, token});
//
//   return user.save().then(() => {
//     return token;
//   });
// };
//
// var User = mongoose.model('User', UserSchema);
// module.exports = {User};
//
//
//
// // using a traditional func becuase arrow funcs cant access the this keyword
// // UserSchema.methods.generateAuthToken = function () {
// //   var user = this;
// //   var access = 'auth';
// //   var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
// //
// //   user.tokens.push({access, token});
// //
// //   return user.save().then(() => {
// //     return token;
// //   });
// // };
// //
// // var User = mongoose.model('User', UserSchema);
//
//
//
//
// //
// // var User = mongoose.model('User',{
// //   email: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //     minlength:1,
// //     unique:true,
// //     validate:{
// //       validator: (value)  => {
// //         return validator.isEmail(value);
// //       },
// //       message: '{VALUE} is not a valid email'
// //     }
// //   },
// //   password: {
// //     type: String,
// //     require: true,
// //     minlength:6
// //   },
// //   tokens: [{
// //     access: {
// //       type:String,
// //       required:true
// //     },
// //     token: {
// //       type:String,
// //       required:true
// //     }
// //   }]
// // });
//
//
// // module.exports = {User};

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken  = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token,'abc123');

  } catch (e) {
    // return new Promise((resolve,reject) => {
    //   reject();
    // instead of the above use below
    return Promise.reject();
    };


  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });


};

// remember use a function rather than arrow func as ou need access to this
// keyword
UserSchema.pre('save', function (next){
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }



});


var User = mongoose.model('User', UserSchema);

module.exports = {User}
