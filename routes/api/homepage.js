const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');

router.get('/homepage' , passport.authenticate('jwt', {session:false}), (req,res)=>{

  User.findById(req.user.id, ('following'))
  .populate( 'following.user').lean()
  .then(following => {
    if(following){
   

      console.log(following.following.map( follow => follow.user._id));
      var userFollowing =[];
      userFollowing = following.following.map( follow => follow.user._id);

      Post.find({ "postedBy": { "$in": userFollowing } } ).lean()
          // .where('postedBy')         
          // .in(userFollowing)
          .populate('postedBy', ['name', 'username', 'avatar'])
          .populate('likes.likedBy', ['name', 'username', 'avatar'])
          .populate('comments.commentedBy', ['name', 'username', 'avatar'])

          .limit(4)
          .sort({timePosted: -1})
          .exec((err, records) => {

        // console.log('userFollowing' ,userFollowing);
          return res.json(records);
      });


    }
    else{
      return res.status(404).json({ success: false, message: "you are not following Anyone"});
    }
  })
  .catch(err =>{
    return res.status(500).json({ success: false, message: err.message });
  });
});

  module.exports = router;
  