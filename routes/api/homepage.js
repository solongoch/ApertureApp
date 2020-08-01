const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');

// @route   put api/home
// @desc    Home page or Main feed of the loggedin user
// @access  Private

router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
  var userFollowing = [];

  
  User.findById(req.user.id, ('following.user')).lean()
  .then(following => {
      //Get [] of loggedin User's following user id's
      userFollowing = following.following.map(follow => follow.user._id);
       //Get the posts of whom user is following's
      Post.find({ "postedBy": { "$in": userFollowing } } ).lean()
          .populate('postedBy likes.likedBy comments.commentedBy ',
            ['username', 'avatar'])
          .sort({ timePosted: -1 })//for latest records
          .limit(20)//get only 20 posts
          .exec((err, records) => {            
            if(err) {
              return res.status(500).json({ success: false, message: err.message });
            }
            return res.json(records);
          });//Post find ends
    })//then ends
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });//user findById catch ends 
});

module.exports = router;