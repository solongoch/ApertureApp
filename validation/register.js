const validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // validate name
  if (isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // validate username
    if (isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }
  if (!validator.isLength(data.username, {min: 6, max: 30})) {
    errors.username = 'Username must be between 6 and 30 characters';
  }

  // validate email
  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'This email is invalid';
  }

  // validate password
  if (isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (isEmpty(data.password2)) {
    errors.password2 = 'Please confirm your password';
  }

  if (validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}