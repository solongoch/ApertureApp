const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Follows");// Load Profile Model
const User = require("../../models/User");// Load User Model
// Load Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["username", "name", "avatar", "email"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["username", "name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   Get http://localhost:7500/api/profile/:username
// @desc    Return current user
// @access  Public

router.get('/:username', (req,res) =>{
  console.log("getUsername");
  const userName = {username:req.params.username}

  User.findOne(userName , {"_id":0,'name': 1, 'username': 1, 'avatar': 1})
      .then( user => {
        if(user){
          //TODO to fetch user followers and following and post count
           return res.json({ success : true, message: user });        
        } 
        return res.status(404).json({ success: false, message: 'There is no profile for this user' });
      })
      .catch( err =>{
        return res.status(500).json({ success: false, message: err.message });
      });
});

// @route   GET api/profile/edit
// @desc    Display profile information
// @access  Private
router.get(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      User: {
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
        website: req.user.website,
        bio: req.user.bio,
        mobile: req.user.mobile,
        gender: req.user.gender,
        date: req.user.date
      }
    });
  }
);
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // check validation
    if (!isValid) {
      // if it's not valid return referring error message
      return res.status(400).json(errors);
    }

    // get fields
    const userFields = {};
    userFields.name = req.body.name;
    userFields.username = req.body.username;
    userFields.email = req.body.email;
    if (req.body.website) userFields.website = req.body.website;
    if (req.body.bio) userFields.bio = req.body.bio;
    if (req.body.mobile) userFields.mobile = req.body.mobile;
    if (req.body.gender) userFields.gender = req.body.gender;

    User.findOne({ user: req.user.id })
      .then((user) => {
        if (user) {
          // update profile
          User.findOneAndUpdate(
            { user: req.user.id },
            { $set: userFields },
            { new: true}
          ).then((user) => res.json(user));
        } else {
          // create profile
          User.findOne({ username: userFields.username})
            .then((user) => {
              if (user) {
                errors.username = 'Username already exists';
              }
              // save user
              new User(userFields)
                .save()
                .then((user) => res.json(user));
            });
        }
      })
      .catch(err => res.status(400).json({err: ''}));
  }
);

module.exports = router;