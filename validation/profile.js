const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // validate name
  if (!isEmpty(data.name) &&!validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }
  if (isEmpty(data.name)) {
    errors.name = "Name should not be empty";
  }
  // validate username
  if (!isEmpty(data.username) && !validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3 and 30 characters";
  }
  if (isEmpty(data.username)) {
    errors.username = "Username should not be empty";
  }

  // validate email
  if (!isEmpty(data.email) && !validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }
  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // validate website
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Invalid website url";
    }
  }

  // validate phone number
  if (!isEmpty(data.mobile)) {
    if (!validator.isMobilePhone(data.mobile)) {
      errors.mobile = "Invalid phone number";
    }
  }

  // validate gender
  if (!isEmpty(data.gender)&&(!validator.isIn(data.gender, ['male', 'female', 'other']))) {
    errors.gender = "Invalid gender value";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
