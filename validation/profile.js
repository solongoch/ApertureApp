const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  // website validaiton
  if (isEmpty(data.website)) {
    errors.website = 'Please enter a website url';
  }

  if (!validator.isURL(data.website)) {
    errors.website = 'Invalid website url';
  }

  // // Email validation
  // if (isEmpty(data.email)) {
  //   errors.email = 'Email is required';
  // }

  // if (!validator.isEmail(data.email)) {
  //   errors.email = 'Invalid email address';
  // }

  // Phone number validation
  if (isEmpty(data.mobile)) {
    errors.mobile = 'Please enter a phone number';
  }

  if (validator.isMobilePhone(data.mobile)) {
    errors.mobile = 'Invalid phone number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}