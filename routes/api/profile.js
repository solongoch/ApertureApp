const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");// Load User Model
// Load Validation
const validateProfileInput = require("../../validation/profile");


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