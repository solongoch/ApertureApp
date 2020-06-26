const express = require("express");
const router = express.Router();
const passport = require("passport");
const Follows = require("../../models/Follows");
const User = require("../../models/User");

// load Validations
const validateProfileInput = require("../../validation/profile");

// test route
router.get("/test", (req, res) => res.json({ msg: "Profile works!" }));

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
    userFields.user = req.user.id;
    userFields.name = req.body.name;
    userFields.username = req.body.username;
    userFields.email = req.body.email;
    if (req.body.website) userFields.website = req.body.website;
    if (req.body.bio) userFields.bio = req.body.bio;
    if (req.body.mobile) userFields.mobile = req.body.mobile;
    if (req.body.gender) userFields.gender = req.body.gender;
    if (req.body.isPublic) userFields.isPublic = req.body.isPublic;
    console.log(userFields);

    //const userId = '5ef391e07121fd0428da6c6a';
    User.findById(req.user.id)
      .then(user => {
        User.findOne({ email: userFields.email }).then(email => {
          if (email) {
            errors.email = "Email already exists";
          }
        });
        User.findOne({ username: userFields.username }).then(email => {
          if (username) {
            errors.username = "Username already exists";
          }
        });
        if (user) {
          // update profile
          User.findOneAndUpdate(
            { email: req.user.email },
            { $set: userFields },
            { new: true }
          ).then(updatedUser => res.json(updatedUser));
        }
        // else {
        //   // create profile
        //   User.findOne({ username: userFields.username})
        //     .then((user) => {
        //       if (user) {
        //         errors.username = 'Username already exists';
        //       }
        //       // save user
        //       new User(userFields)
        //         .save()
        //         .then(( user) => res.json(user));
        //     });
        //   }
      })
      .catch(err => res.status(400).json({ err: "findOne method failed" }));
  }
);

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

module.exports = router;