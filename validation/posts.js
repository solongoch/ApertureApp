const validator = require('validator');
const isEmpty = require('./is-empty');


module.exports =  function validatePostInput(data) {

  const errors ={};
 // validate Caption
  // if (!validator.isLength(data.caption, { max: 2200 })) {
  //   errors.caption = "Caption must be less than 2200 characters";
  // }
  // if(isEmpty(data.caption)){
  //   errors.caption = "Post caption is required"
  // }
  // validate image
  if(isEmpty(data.photo)){
    errors.photo = "Image is required"
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}




