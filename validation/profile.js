const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  
  if (!Validator.isLength(data.user, { min: 2, max: 30 })) {
    errors.handle = "Username needs to be between 2 and 30 characters";
  }

  if (isEmpty(data.user)) {
    errors.handle = "Username is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};