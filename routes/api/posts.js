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



// @route   PUT api/posts/:postId/likes
// @desc    Like and Dislike  post
// @input   Postid from request params
// @access  Private

router.put('/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {


  Post.findOne({ _id: req.params.postId })//Chk post exists to like
    .then(post => {
      if (post) { //Post found 
        //Post already liked by user then remove the user from the likes []
        if (post.likes.filter((like) => like.likedBy.toString() === req.user.id).length > 0) {
          const userIndex = post.likes.map(like => like.likedBy.toString().indexOf(req.userid));
          post.likes.splice(userIndex, 1);
          post.save()
            .then(data => res.json({ success: true, message: "User disliked a Post" }))
            .catch(err => res.status(500).json({ success: false, message: err.message }));
        }
        else {//ass user to likes []
          post.likes.unshift({ likedBy: req.user.id });
          post.save()
            .then(data => res.json({ success: true, message: "User liked a Post" }))
            .catch(err => res.status(500).json({ success: false, message: err.message }));
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

module.exports = router;