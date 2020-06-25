const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique : true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique : true,
    lowercase: true
  },
  avatar: {
    type: String,
    required: false
  },
  website: { type: String },
  bio: { type: String },
  mobile: { type: Number },
  //enum: This states that the string can only have the value specified in the enum array.
  gender: { type: String, enum: ['male', 'female', 'other'] },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
