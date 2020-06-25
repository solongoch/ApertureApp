const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// load Validations
const validateProfileInput = require('../../validation/profile');

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

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;