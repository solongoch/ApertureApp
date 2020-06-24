const validator = require('validator');
const isEmpty = require('./is-empty');

const changePasswordInput = (data) => {

  const errors ={} ;
  //Old Password Validation
  if(!validator.isLength(data.oldpassword , {min :6 , max: 30})){
    errors.oldpassword = 'Old Password length must be at least 6 characters'
  }
  if(isEmpty(data.oldpassword)) {
    errors.oldpassword = 'Old Password should not be empty'
  }

  //New Password 
  if(validator.equals(data.oldpassword, data.newpassword)) {
    errors.newpassword = 'Old and New passwords must be different';
  }
  if(validator.isAlphanumeric(data.newpassword)) {
    errors.newpassword = "New Password must include at least one characters, numbers and special characters";
  }
  if(!validator.isLength(data.newpassword , {min :6 , max: 30})){
    errors.newpassword = 'New Password length must be at least 6 characters'
  }
  if(isEmpty(data.newpassword)) {
    errors.newpassword = 'New Password should not be empty'
  }

  //Confirm Password Validation
  if(!validator.equals(data.newpassword, data.confirmpassword)) {
    errors.confirmpassword = 'New Password and Confirm New Password do not match';
  }
  if(!validator.isLength(data.confirmpassword , {min :6 , max: 30})){
    errors.confirmpassword = 'Confirm New Password length must be at least 6 characters'
  } 
  if(isEmpty(data.confirmpassword)) {
    errors.confirmpassword = 'Confirm New Password should not be empty'
  }
  return{
    errors, isValid : isEmpty(errors)
  };

}//changePasswordInput validation ends here

module.exports = changePasswordInput;
