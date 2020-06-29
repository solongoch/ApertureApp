const express = require("express");
const router = express.Router();
const passport = require("passport");
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
    if (req.body.name) userFields.name = req.body.name;
    if (req.body.username) userFields.username = req.body.username;
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.website) userFields.website = req.body.website;
    if (req.body.bio) userFields.bio = req.body.bio;
    if (req.body.mobile) userFields.mobile = req.body.mobile;
    if (req.body.gender) userFields.gender = req.body.gender;
    if (req.body.isPublic) userFields.isPublic = req.body.isPublic;

    User.findById(req.user.id)
      .then(user => {
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


// @route   Get http://localhost:7500/api/profile/:username
// @desc    Return public user's data like name,username.avatar, following and follower count.
// @input   Username as request params
// @access  Public

router.get('/:username', (req, res) => {
  const userName = { username: req.params.username }
  //Check User exists 
  User.findOne(userName ,  ["username", "name", "avatar"])
    .then(user => {
      if (user) { //if exist
        if (isPublicUser(user)) { //for public account fetch follower and following from Follows collection
          return res.json({
            user,
            followersCount: data.followers.length,
            followingCount: data.following.length
          });
          
        } else {//For private account throw err
          return res.status(401).json({ success: false, message: 'This account is private' });
        }
      } else {
        return res.status(404).json({ success: false, message: 'There is no such profile' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
});

//check user is public
function isPublicUser(user) {
  return user.isPublic ? true : false;
}

module.exports = router;