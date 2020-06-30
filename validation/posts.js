const validator = require('validator');
const isEmpty = require('./is-empty');


module.exports =  function validatePostInput(data) {

  const errors ={};
 // validate Caption 

   if (!isEmpty(data.caption)) {
    if (!validator.isLength(data.caption, { max: 1000 })) {
      errors.caption = "Caption must not exceeds 1000 characters";
    }
  }




  
  // validate image
  if(isEmpty(data.photo)){
    errors.photo = "Image is required"
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
