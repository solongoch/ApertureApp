const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  if (!Validator.isLength(data.description, { max: 2200 })) {
    errors.text = "Description must be less than 2200 characters";
  }

  if (isEmpty(data.photo)) {
    errors.text = "Image is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};