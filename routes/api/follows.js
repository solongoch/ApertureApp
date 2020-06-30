const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');

// @route   put api/follow/:userId
// @desc    Follow User
// @input   Get Userid from req params of person whom user wants to follow.
// @access  Private


router.put('/:user_id/follow', passport.authenticate('jwt', { session: false }), (req, res) => {

  // check if your id doesn't match the id of the user you want to follow
  if (req.user.id === req.params.user_id) {
    return res.status(400).json({ alreadyfollow: "You cannot follow yourself" })
  }
  User.findById(req.params.user_id)
    .then(user => {
      if (user) {//user exists
        // check if the requested user is already in follower list of other user then 

        if (user.followers.filter(follower =>
          follower.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadyfollow: "You already followed the user" });
        }
        user.followers.unshift({ user: req.user.id });
        user.save()
          .then(result => {
            User.findOne({ email: req.user.email })
              .then(user => {
                if (user.following.filter(following =>
                  following.user.toString() === req.params.userId).length > 0) {
                  return res.status(400).json({ alreadyfollow: "You already following the user" })
                }
                user.following.unshift({ user: req.params.user_id });
                user.save().then(user => res.json({ 
                  success : true,
                  message : "Followed"}));
              });

          })
          .catch(err => res.status(500).json({ message: err.msg }));
      } else {//no user founf to follow
        return res.status(404).json({ success: false, message: 'There is no such profile' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
});





// @route   put api/follow/:userId
// @desc    Unfollow User
// @input   Get Userid from req params of person whom user wants to unfollow.
// @access  Private


router.put('/unfollow/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {

 
  // check if your id doesn't match the id of the user you want to follow
  if (req.user.id === req.params.user_id) {
    return res.status(400).json({ alreadyfollow: "You cannot unfollow follow yourself" })
  }
  User.findById(req.params.user_id)
    .then(user => {
      if (user) {//user exists
        // check if the requested user is already in follower list then remove 

        if (user.followers.filter(follower =>
            follower.user.toString() === req.user.id).length > 0) {
         
            const followerIndex = user.followers.map(follower => follower.user.toString().indexOf(req.userid));
            user.followers.splice(followerIndex, 1);
            user.save()
              .then(data => {
                User.findOne({ email: req.user.email })
                    .then(doc => { //check if unfollow user in following [] then remove
                      if (doc.following.filter(follow =>
                             follow.user.toString() === req.params.user_id).length > 0) {
                              const followingIndex = doc.following.map(follow => 
                                                follow.user.toString().indexOf(req.userid));
                                doc.following.splice(followingIndex, 1);
                                doc.save();
                                return res.json({
                                  success : true,
                                  message : "Unfollowed"});
                        }else{
                          return res.status(400).json({ message: "You are not the following the user yet" });
                        }
                    })
              });
                
        }else{
          return res.status(400).json({ message: "You are not the following the user yet" });
        }
      }else {//no user founf to follow
        return res.status(404).json({ success: false, message: 'There is no such profile' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });
  
      
});
module.exports = router;
