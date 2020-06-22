const validator = require('validator');
const isEmpty = require("./is-empty");

module.export = function vaildateLoginInput(data) {
 let errors = {};   

if (!validator.isLength(data.username, {min:2, max: 30})) {
    errors.username = "Username must be between 2 and 30 characters";
}

if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
}

if (isEmpty(data.email)) {
    errors.email = "Email or username is required";
}

if (!validator.isLength(data.password, {min: 6, max: 30})) {
    errors.pasword = "Password must be between 6 and 30 characters";
}

if (isEmpty(data.password)) {
    errors.password = "Password field is required";
}

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
