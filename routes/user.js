const router = require('express').Router();
const User = require('../models/User');
const gravatar = require('gravatar');//import gravatar
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys').secretOrKey;
const passport = require('passport');

// @route   POST  http://localhost:7500/api/users/register
// @desc    Register User
// @access  public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      processRequest(user, req, res)
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some internal error Occured " + err.message
      })
    });
});

function processRequest(user, req, res) {
  if (user) {
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
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    avatar
  });
  saveUserDocument(newUser, res);
}

//saves user document  to mongoDB
function saveUserDocument(newUser, res) {

  //Generte salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    //generating hash
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then((user) => {
          res.json({ success: true, user: user, message: 'User Successfullu Registered!' });
        })
        .catch(err => {
          res.status(500).send(
            { message: err.message || "Some error occurred while creating the User." });
        });
    });
  });
}


// @route   POST http://localhost:7500/api/users/login
// @desc    Login User
// @access  public

router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then((user) => {
      console.log("object1", user);
      if (!user) {
        return res.status(404).json({ email: "User not found" });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //payload json object
            const payload = { 
              id : user.id,
              email :user.email,
              avatar: user.avatar,
              username : user.username
             };
            //Create or sign Bearer token
            jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;
              return res.json({ message: 'Success', token: 'Bearer ' + token });
            });
          }
          else {
            return res.status(400).json({ message: 'You entered the wrong password' });
          }
        })
        .catch(err => {
          return res.status(400).json({ message: err.message });
        });

    })
    .catch(err => res.status(500).json({ message: err.message }));



});



// @route   Get http://localhost:7500/api/users/current
// @desc    Return c  urrent user
// @access  Private

router.get('/current',
  passport.authenticate('jwt', { session: false }), 
  (req, res) => { 

    return res.json({message : 'Success'})

  });


module.exports = router;