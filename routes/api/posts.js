const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');
const validatePostInput = require('../../validation/posts');



// @route   Post api/posts/:postId/likes
// @desc    Create Post 
// @input   Postid from request params
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  // Check Validation
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }
  //Fields to post
  const postFields = {
    postedBy: req.user.id,
    caption: req.body.caption,
    photo: req.body.photo
  }
  const newPost = new Post(postFields); //create a post object
  //Save post in Posts Collection
  newPost.save()
         .then(post => {
            return res.json({ success: true, message: "Successfully posted!" });
          })
          .catch(err => {
            return res.status(500).json({ success: false, message : err.message });
          });
});



// @route   PUT api/posts/:postId/lu
// @desc    Like and Dislike  post
// @input   Postid from request params
// @access  Private

router.put('/lu/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {

  //Chk post exists to like
  Post.findOne({ _id: req.params.postId })
      .populate("postedBy", ['isPublic'])
    .then(post => {
      if (post) { //Post found 
          if(post.postedBy.isPublic){//Any one can like public account post
            likeUnlikePost(post,req,res);
          }
          else{//Private Account User
             if( req.user.following.filter( follow =>
                 follow.user.toString() === post.postedBy._id.toString()).length>0 || 
                  (post.postedBy._id == req.user.id))
            {
                    likeUnlikePost(post,req,res);
            }else{

              return res.status(401).json({message: "You cannot like private post"});
            }

          }
        
      }
      else {//post not found
        return res.status(400)
          .json({ success: false, message: "Post not found" });
      }
    })
    .catch(err => {
      res.status(422).json({ success: false, message: err.message })
    })
});



function likeUnlikePost(post,req,res){
//Post already liked by user then remove the user from the likes []
if (post.likes.filter((like) => like.likedBy.toString() === req.user.id).length > 0) {
  const userIndex = post.likes.map(like => like.likedBy.toString().indexOf(req.user.id));
  post.likes.splice(userIndex, 1);
  post.save()
    .then(data => res.json({ success: true, message: "User disliked a Post" }))
    .catch(err => res.status(500).json({ success: false, message: err.message }));
}
else {//add user to likes []
  post.likes.unshift({ likedBy: req.user.id });
  post.save()
    .then(data => res.json({ success: true, message: "User liked a Post" }))
    .catch(err => res.status(500).json({ success: false, message: err.message }));
}


}
module.exports = router;