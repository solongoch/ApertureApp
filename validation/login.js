const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Loginid length Validation
  if (!validator.isLength(data.loginId, { min: 3, max: 30 })) {
    errors.loginId = 'Check the length of the Login id';
  }
  //Login Id IsEmpty Check
  if (isEmpty(data.loginId)) {
    errors.loginid = 'Login id should not be empty';
    
  }
  //Password validaiton
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must have at least 6 characters";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password should not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
