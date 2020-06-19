const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// api/users/test
router.get("/test", (req, res) => res.json("Users test works"));

// @route   POST  api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists." });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log("couldn't save newUser"));
          });
        });
      }
    })
    .catch((err) => console.log("couldn't find one"));
});

// @route   POST  api/users/login
// @desc    Login user
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email })
    .then(user => {
      // if there's no registered email
      if (!user) {
        return res.status(404).json({email: 'User not found.'});
      }

      // check password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          return res.json({msg: 'login success.'})
        } else {
          return res.status(400).json({password: 'Password incorrect.'})
        }

      });
    })
    .catch()
});

module.exports = router;
