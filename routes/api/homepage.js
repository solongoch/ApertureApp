const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');

router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
  var userFollowing = [];
  var myPost = mongoose.Types.ObjectId(req.user.id);//get logged in user id to get post
  
  User.findById(req.user.id, ('following'))
  .populate('following.user').lean()
  .then(following => {
    if (following) {
      userFollowing = following.following.map(follow => follow.user._id);
    } 
    //Pushing userid of logged in user into userFollowing[] to fetch posts
        userFollowing.push(myPost);
        console.log(userFollowing); 
        //
        Post.find({ "postedBy": { "$in": userFollowing } } ).lean()
            .populate('postedBy likes.likedBy comments.commentedBy ',
              ['name', 'username', 'avatar'])
            .sort({ timePosted: -1 })//for latest records            
            .exec((err, records) => {
              if(records) {
                return res.json(records);
              }
              if(err) {
                return res.status(400).json({ success: false, message: err.message });
              }
            });//Post find ends
      
      
      })//then ends
      .catch(err => {
        return res.status(500).json({ success: false, message: err.message });
      });//user findById catch ends 
});

module.exports = router;


/* //another way for where and in condition
    .where('postedBy').in(userFollowing)
    //another way to populate
    .populate('likes.likedBy', ['name', 'username', 'avatar'])
    .populate('comments.commentedBy', ['name', 'username', 'avatar']) */
