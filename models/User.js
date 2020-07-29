const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Set `trim: true` on every string path by default
// removes leading and trailing whitespace from the string automatically
Schema.Types.String.set('trim', true);

// create User's Schema
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
  website: { 
    type: String 
  },
  bio: { 
    type: String 
  },
  mobile: { 
    type: String
  },
  gender: { 
    type: String, 
    //enum: This states that the string can only have the value specified in the enum array.
    enum: ["Male", "Female", "Prefer Not to Say" , "Custom"] 
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  followers: [{ user: {type: Schema.Types.ObjectId, ref: 'users' }}],
  following: [{ user: {type: Schema.Types.ObjectId, ref: 'users' }}]
});

module.exports = User = mongoose.model('users', UserSchema);
