const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");// Load User Model
const Post = require("../../models/Posts");// Load User Model
// Load Validation
const validateProfileInput = require("../../validation/profile");
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");


// @route   Get http://localhost:7500/api/profile/:username
// @desc    Return public user's data like name,username.avatar, following and follower count.
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
                console.log("Public route");
                data.posts = posts;
              } else {
                if (req.isAuthenticated()) {
                  // check logged in user(req.user) is following the user OR
                  if (user.followers.filter(follower =>
                    follower.user.toString() === req.user.id).length > 0 ||
                    // req.user is postedBy (user's own post)
                    (user._id == req.user.id)) {
                    data.posts = posts;
                  }
                  else { // req.user is not following OR not own post
                    res.json({ msg: "This account is private. Do you want to follow?" });
                  }
                }//Fore Private route ends
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


module.exports = router;