const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // validate name
  if (isEmpty(data.name)) {
    errors.name = "Please enter your name";
  }

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  // validate username
  if (isEmpty(data.username)) {
    errors.username = "Please enter your name";
  }

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Username must be between 2 and 30 characters";
  }
  // validate email
  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }
  // validate website
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Invalid website url";
    }
  }

  // validate phone number
  if (!isEmpty(data.mobile)) {
    if (validator.isMobilePhone(data.mobile)) {
      errors.mobile = "Invalid phone number";
    }
  }

  // validate gender
  if (!validator.equals(data.gender, 'male' || 'female' || 'other')) {
    errors.gender = "Invalid gender value";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
