const router = require('express').Router();
const User = require('../models/User.model');
const gravatar = require('gravatar');//import gravatar
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
   User.findOne({ email: req.body.email })
    .then((user) => {
      console.log("Chk DB");
      processRequest(user, req, res)
    })
    .catch((err) => {
      console.log("err chk");
      res.status(500).json({
        message: "Some internal error Occured " + err.message
      })
    });

});


function processRequest(user, req, res) {
  console.log("processRequest");
  if (user) {
    console.log("processRequest1");
    return res.status(400)
      .json({ Success: false, Message: "Registered Email already exists" });
  }

  createUser(req, res);

}

function createUser(req, res) {

  const avatar = gravatar.url(req.body.email,
     {
        s: '100', r: 'pg', d: 'mm', protocol: 'http'
     });  
  const newUser = new User({
      name : req.body.name ,
      username: req.body.username ,
      email : req.body.email,
      password : req.body.password ,
      mobile : req.body.mobile,
      avatar
  });
   saveUser(newUser , res);
}

function saveUser(newUser , res){  
  bcrypt.genSalt(10 , (err , salt) => {
    if(err) throw err;

    bcrypt.hash(newUser.password , salt , (err , hash) => {
      if(err) throw err;

      newUser.password = hash;
      console.log(newUser);
      newUser.save()
            .then( (user) => {
              res.json({ success : true , user : user , message : 'User Successfullu Registered!'});
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
              });
            });
    });

  });


}


module.exports = router;