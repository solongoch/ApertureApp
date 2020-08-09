const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// @route   put api/:userId/follow
// @desc    Follow User
// @input   Get Userid from req params of person whom user wants to follow.
// @access  Private

router.put('/:userId/follow', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userId = req.params.userId;
  // check if your id doesn't match the id of the user you want to follow
  if (req.user.id === userId) {
    return res.status(400).json({ alreadyfollow: "You cannot follow yourself" })
  }
  User.findById(userId)
    .then(user => {
      if (user) {//user exists
        // check if the requested user is already in follower list of other user then
        if (user.followers.some(follower => follower.user.toString() === req.user.id)) {
          return res.status(400).json({ alreadyfollow: "You already followed the user" });
        }
        user.followers.unshift({ user: req.user.id }); // adding in follower[]
        user.save()
          .then(() => {
            User.findOne({ email: req.user.email }) 
              .then(myUser => {
                if (myUser.following.some(following => following.user.toString() === userId)) {
                  return res.status(400).json({ alreadyfollow: "You already following the user" })
                }
                myUser.following.unshift({ user: userId });
                myUser.save().then(() => {

                 //removed password from return response
                 user = {
                  _id: user._id,
                  name: user.name,
                  username: user.username,
                  avatar:user.avatar
                }                 
                return res.json({user})});
              });
          })
          .catch(err => res.status(500).json({ message: err.msg }));
      } else {//no user found
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
});

// @route   put api/:userId/unfollow
// @desc    Unfollow User
// @input   Get Userid from req params of person whom user wants to unfollow.
// @access  Private

router.put('/:userId/unfollow', passport.authenticate('jwt', { session: false }), (req, res) => {

  const userId = req.params.userId;
  // check if your id doesn't match the id of the user you want to follow
  if (req.user.id === userId) {
    return res.status(400).json({ alreadyfollow: "You cannot unfollow yourself" })
  }
  User.findById(userId)
    .then(user => {
      if (user) {//user exists
        // check if the requested user is already in follower list then remove 
        if (user.followers.some(follower => follower.user.toString() === req.user.id)) {
          const followerIndex = user.followers.map(follower => 
            follower.user.toString().indexOf(req.userid));
          user.followers.splice(followerIndex, 1); // remove user from follower[]
          user.save()
            .then(() => {
              User.findOne({ email: req.user.email })
                .then(doc => { //check if unfollow user in following [] then remove
                  if (doc.following.some(follow => follow.user.toString() === userId)) {
                    const followingIndex = doc.following.map(follow =>
                      follow.user.toString().indexOf(req.userid));
                    doc.following.splice(followingIndex, 1);
                    doc.save();
                    //removed password from return response
                    user= user.toObject();
                    delete user.password                    
                    delete user.__v;                   

                    return res.json({
                      success: true,
                      message: `Unfollowed ${userId}`,
                      user: user
                    });
                  } else {
                    return res.status(400).json({ message: "You are not the following the user" });
                  }
                })
            });
        } else {     
          return res.status(400).json({ message: "You are not the following the user yet" });
        }
      } else { // no user found to follow
        return res.status(404).json({ success: false, message: 'There is no such profile' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
});

// @route   put api/:username/followers
// @desc    Get followers[] id, name, username and avatar of given user
// @input   username from request params
// @access  Private
router.get(
  "/:username/followers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ username: req.params.username }, ["_id", "followers"])
      .populate("followers.user", ["username", "name", "avatar"])
      .then(user => {
        if(!user){
          return res.status(404).json({ success: false, message: "User not found" });
        }
        const paramsId = user._id;
        // empty followers array
        if (user.followers.length < 1) { // Note: on instagram "followers" is not clickable
          return res.status(404).json({ success: false, message: "No Followers" });
        } else if (
          // user seeing own followers list OR
          req.params.username === req.user.username ||
          // user seeing followers of person who following
          req.user.following.some(obj => obj.user.toString() == paramsId.toString())
        ) {
          return res.json({'Followers': user.followers});
        } else {
          // can't see followers list of person who didn't follow
          return res.json({ msg: "Do you want to follow?" });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, message: err.message });
      });
  }
);

// @route   put api/:username/following
// @desc    Get following[] id, name, username and avatar of given user
// @input   username from request params
// @access  Private
router.get(
  "/:username/following",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ username: req.params.username }, ["_id", "following"])
      .populate("following.user", ["username", "name", "avatar"])
      .then(user => {
        if(!user){
          return res.status(404).json({ success: false, message: "User not found" });
        }
        const paramsId = user._id;
        // empty following array
        if (user.following.length < 1) { // Note: on instagram "following" is not clickable
          return res.status(404).json({ success: false, message: "No Following" });
        } else if (
          // user seeing own following list OR
          req.params.username === req.user.username ||
          // user seeing following of person who following
          req.user.following.some(obj => obj.user.toString() == paramsId.toString())
        ) {
          return res.json({'Following': user.following});
        } else {
          // can't see followers list of person who didn't follow
          return res.json({ msg: "Do you want to follow?" });
        }
      })
      .catch(err => {
        return res.status(500).json({ success: false, message: err.message });
      });
  }
);

module.exports = router;