const router = require("express").Router();
const User = require("../../models/User");
const gravatar = require("gravatar"); //import gravatar
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys").secretOrKey;
const passport = require("passport");
// Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//common function for error handling for Signup and Edit profile
const {errorHandler} = require("../../utils/common");

// @route   POST  http://localhost:7500/api/users/signup
// @desc    Register User
// @input   Name,Username, email, password from request body
// @access  public
router.post("/signup", (req, res) => {
  //Validations
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const avatar = gravatar.url(req.body.email, {
    s: "100",
    r: "pg",
    d: "mm",
    protocol: "http"
  });

  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar
  });
  //Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    //generating hash
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      //save the document in MongoDB
      newUser
        .save()
        .then(user => {
          userDisplay = {
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar
          };
          res.json({
            success: true,
            user: userDisplay,
            message: "User Successfully Registered!"
          });
        })
        .catch(err => errorHandler(err, res));
    });
  });
});


// @route   POST http://localhost:7500/api/users/login
// @desc    Login User
// @input   Username or email and password
// @access  public
router.post("/login", (req, res) => {
  //Validations
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const loginId = req.body.loginId.toLowerCase();
  const password = req.body.password;
  // find a user based on  username=loginId or email = loginId
  var criteria = { $or: [{ username: loginId }, { email: loginId }] };
  User.findOne(criteria)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          loginId: "User not found"
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //payload json object
            const payload = {
              id: user.id,
              email: user.email,
              avatar: user.avatar,
              username: user.username,
              name: user.name
            };
            //Create or sign Bearer token
            jwt.sign(payload, keys, { expiresIn: 60000 }, (err, token) => {
              if (err) throw err;
              return res.json({
                success: true,
                message: "Token Created",
                token: "Bearer " + token
              });
            });
          } else {
            return res.status(401).json({
              password: "Incorrect Password"
            });
          }
        })
        .catch(err => {
          return res.status(404).json({
            success: false,
            message: err.message
          });
        });
    })
    .catch(err =>
      res.status(404).json({ success: false, loginId: err.message })
    );
});

// @route   GET http://localhost:7500/api/users/login
// @desc    Login page
// @access  Public
router.get("/login", (req, res) => {
  res.json({ msg: "Login page" })
});

module.exports = router;