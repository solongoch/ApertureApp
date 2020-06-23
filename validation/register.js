const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {

  let errors = {};
  //Name validaiton
  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = 'Name must be between 3 to 30 characters';
  }
  if (isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  //Username validaiton
  if (!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = 'Username must be between 3 to 30 characters';
  }
  if (isEmpty(data.username)) {
    errors.username = 'Username is required';
  }

  //Email validaiton
  if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  //Password Validation

  if (validator.isAlphanumeric(data.password)) {
    errors.password = "Password must include at least one characters, numbers and special characters";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have at least 6 characters';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password should not be empty';
  }

  //Password2 Validation

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password and Confirmation password do not match";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password should not be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}