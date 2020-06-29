const validator = require('validator');
const isEmpty = require('./is-empty');


module.exports =  function validatePostInput(data) {

  const errors ={};
 // validate Caption
  // if (!validator.isLength(data.caption, { min: 3, max: 300 })) {
  //   errors.caption = "Caption must be between 3 and 300 characters";
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
