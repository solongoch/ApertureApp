const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");// Load User Model
const Post = require("../../models/Posts");// Load Posts Model
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");
// Load Validation
const validateProfileInput = require("../../validation/profile");


// @route   Get http://localhost:7500/api/profile/:username
// @desc    Return public user's data like name,username,bio,website, avatar, 
//          following and follower count, no of posts.
// @input   Username as request params
// @access  Public

router.get('/:username', accessRouteWithOrWithoutToken, (req, res) => {
  const userName = { username: req.params.username }

  //Check User exists 
  User.findOne(userName,
    ["username", "name", "avatar", "bio", "website", "followers", "following", "isPublic"])
    .lean()
    .then(user => {
      if (user) {
        const data = {
          isPublic: user.isPublic,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio,
          website: user.website,
          followersCount: user.followers ? user.followers.length : 0,
          followingCount: user.following ? user.following.length : 0
        };
        Post.find({ postedBy: user._id }, ["_id", "photo"]).lean()
          .then(posts => {

            //posts exist for the username then get the count
            if (posts) {
              //If user has public account anyone can see posts
              if (user.isPublic) {
                 data.posts = posts;
              } else {//private user
                if (req.isAuthenticated()) {
                  // check logged in user(req.user) is following the user OR
                  if (user.followers.some(follower =>follower.user == req.user.id) ||
                    // req.user can see his own post (user's own post)
                    (user._id == req.user.id)) {
                    data.posts = posts;
                  }
                  else { // req.user is not following OR not own post
                   return  res.json({ msg: "This account is private. Do you want to follow?" });
                  }
                }//For Private route ends
              }
              //get the count of posts posted by username 
              data.noOfPosts = posts.length;
              return res.json(data);
            }
            else {//No posts for this ussr
              data.noOfPosts = 0;
              return res.json(data);
            }
          })
          .catch(err => {
            return res.status(500).json({ success: false, message: err.message });
          });
      } else {//No user found 
        return res.status(404).json({ success: false, message: 'There is no such profile' });
      }
    })
    .catch(err => {
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
      })
      .catch(err => res.status(400).json({ err: "findOne method failed" }));
  }
);

module.exports = router;