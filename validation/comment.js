const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  if (!Validator.isLength(data.commentBody, { max: 2200 })) {
    errors.text = "Comment must be less than 2200 characters";
  }

  if (isEmpty(data.commentBody)) {
    errors.text = "Comment should not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};