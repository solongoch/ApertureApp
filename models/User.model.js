const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = User = mongoose.model('users', UserSchema);