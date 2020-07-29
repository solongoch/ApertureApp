module.exports = {
  errorHandler:function(err, res){
      console.log("in errors")
    
      let errors = {}
      if (err.message.includes("username_1 dup key:")) {
        //duplicate username
        errors.username = "Username already exist";
      } else if (err.message.includes("email_1 dup key:")) {
        //dupicate email id
        errors.email = "Email already exists";
      }
      res.status(409).json({
        email: errors.email,
        username: errors.username
      }); 
     
  }
}