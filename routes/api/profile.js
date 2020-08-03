const express = require("express");
const router = express.Router();
const passport = require("passport");
// Model
const User = require("../../models/User");
const Post = require("../../models/Posts");
// Validation
const validateProfileInput = require("../../validation/profile");
// Function
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");
//common function for error handling for Signup and Edit profile
const {errorHandler} = require("../../utils/common");

// @route   Get http://localhost:7500/api/profile/:username
// @desc    Return public user's data like name,username,bio,website, avatar, 
//          following and follower count, no of posts.
// @input   Username as request params
// @access  Public

router.get('/:username', accessRouteWithOrWithoutToken, (req, res) => {
  const userName = { username: req.params.username }

  //Check User exists 
  User.findOne(userName,
    ["_id","username", "name", "avatar", "bio", "website", "followers", "following", "isPublic"])
    .lean()
    .then(user => {
      if (user) {
        const data = {
          id:user._id,
          isPublic: user.isPublic,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio,
          website: user.website,
          followersCount: user.followers ? user.followers.length : 0,
          followingCount: user.following ? user.following.length : 0
        };
        Post.find({ postedBy: user._id }, ["_id", "photo", "likes", "comments"]).lean()
        .sort({ timePosted: -1 })//for latest records
        .limit(20)//get only 20 posts
          .then(posts => {

            //posts exist for the username then get the count
            if (posts) {
              //If user has public account anyone can see posts
              // console.log(posts.forEach(element => console.log(element.comments.length)));
              posts.forEach(element => {
                element.likesCount= element.likes.length;
                delete element.likes;//for not showing likes details
              })
              posts.forEach(element => {
                element.commentsCount= element.comments.length;
                delete element.comments;//for not showing comments details
              })

                
              // posts.forEach(element => console.log(element.likes.length));
              if (user.isPublic) {
                data.posts = posts;
              } else {//private user
                if (req.isAuthenticated()) {
                  // check logged in user(req.user) is following the user OR
                  if (user.followers.some(follower => follower.user == req.user.id) ||
                    // req.user can see his own post (user's own post)
                    (user._id == req.user.id)) {
                    data.posts = posts;
                  }
                  else { // req.user is not following OR not own post
                    data.noOfPosts = posts.length;
                    return res.json(data);
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


// @route   GET api/profile/accounts/edit
// @desc    Display profile information
// @access  Private
router.get(
  "/accounts/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = {
      id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
      isPublic:req.user.isPublic,
      website: req.user.website,
      bio: req.user.bio,
      mobile: req.user.mobile,
      gender: req.user.gender,
      date: req.user.date
    }
    return res.json(user);
  }
);

// @route   POST api/profile/accounts/edit
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/accounts/edit",
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
    userFields.website = req.body.website;
    userFields.bio = req.body.bio;
    userFields.mobile = req.body.mobile;
    userFields.gender = req.body.gender;
    userFields.isPublic = req.body.isPublic;

    User.findById(req.user.id)
    .then(user => {
      if (user) {
        // update profile
        User.findOneAndUpdate(
          { email: req.user.email },
          { $set: userFields },
          { new: true }
          ).then(updatedUser => {
            updatedUser = updatedUser.toObject();
            delete updatedUser.password;
            delete updatedUser.followers;
            delete updatedUser.following;
            delete updatedUser.__v;
            res.json(updatedUser)
          })
          .catch(err => errorHandler(err, res));
        }
      })
      .catch(err => res.status(500).json({ success: false, err: err.message }));
  }
);

// @route   POST api/profile/accounts/edit
// @desc    Create or edit user profile
// @access  Private

router.put('/editavatar', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        if (user) {
          // update avatar
          User.findByIdAndUpdate(
            { _id: req.user.id },
            { avatar: req.body.avatar },
            { new: true })
            .then(user => {

              user = user.toObject();
              delete user._id;
              delete user.password;
              delete user.followers;
              delete user.following;
              delete user.__v;
              res.json(user)
            })
            .catch(err => res.status(500).json({ success: false, message: err.message }))
        } else {
          return res.status(404).json({ success: false, message: 'There is no such profile' });
        }
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message })
      })
  });

module.exports = router;