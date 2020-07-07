const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');

router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
  var userFollowing = [];

  
  User.findById(req.user.id, ('following.user')).lean()
  .then(following => {

      userFollowing = following.following.map(follow => follow.user._id);
       //Get the posts of whom user is following's posts
      Post.find({ "postedBy": { "$in": userFollowing } } ).lean()
          .populate('postedBy likes.likedBy comments.commentedBy ',
            ['username', 'avatar'])
          .sort({ timePosted: -1 })//for latest records
          .exec((err, records) => {            
            if(err) {
              return res.status(500).json({ success: false, message: err.message });
            }
            if(records.length==0) {
              return res.status(400).json({ success: false, message: "No Posts to show. Would you like to follow someone?" });
            }
            return res.json(records);

          });//Post find ends
    })//then ends
    .catch(err => {
      return res.status(500).json({ success: false, message: err.message });
    });//user findById catch ends 
});

module.exports = router;

