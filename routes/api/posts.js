const express = require('express');
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');
// Validation
const validatePostInput = require('../../validation/posts');
const validateCommentInput = require("../../validation/comment");
// Function
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");

// @route   Post api/posts/create
// @desc    Create Post 
// @access  Private

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {

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
            return res.json({ success: true, message: "Successfully posted!",post });
          })
          .catch(err => {
            return res.status(500).json({ success: false, message : err.message });
          });
});


// @route   PUT api/posts/:postId/lu
// @desc    Like and Dislike post
// @input   Postid from request params
// @access  Private

router.put('/:postId/lu', passport.authenticate('jwt', { session: false }), (req, res) => {

  //Chk post exists to like
  Post.findOne({ _id: req.params.postId })
      .populate("postedBy", ['isPublic'])
    .then(post => {
      if (post) { //Post found 
          //Post already liked by user then remove the user from the likes []
          if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            const userIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));
            post.likes.splice(userIndex, 1);
            post.save()
              .then(data => res.json({ success: true, message: "User disliked a Post", likesCount: post.likes.length }))

              .catch(err => res.status(500).json({ success: false, message: err.message }));
          }
          else {//add user to likes []
            post.likes.unshift({ user: req.user.id });
            post.save()
              .then(data => res.json({ success: true, message: "User liked a Post" ,likesCount: post.likes.length }))
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

// @route   GET api/posts
// @desc    Get all posts of logged in user
// @access  Private
router.get("/", 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    Post.find({ postedBy: req.user.id })
      .sort({ timePosted: -1 })
      .then(posts => {
        if (!posts) {
          return res.json(404).json({msg: 'Posts not found.'})
        }
        return res.json(posts);
      })
      .catch(err => res.status(500).json({success: false, error: err.message}));
});

// @route   GET api/posts/:id
// @desc    Get single post by postid
// @input   postId from request params
// @access  Public and Private
router.get("/:id", accessRouteWithOrWithoutToken, (req, res) => {
  Post.findById(req.params.id)
    .populate("postedBy", ["_id", "avatar", "username", "isPublic", "followers"])
    .then(post => {
      // if there is no post with :id
      if (!post) {
        return res.status(404).json({msg: 'Post not found'});
      }
      // if post author's account is public, show post
      if (post.postedBy.isPublic) {
        // remove isPublic and followers from display
        post = post.toObject();
        delete post.postedBy.isPublic;
        delete post.postedBy.followers;

        // show post
        return res.json(post);

      // @usage   if user who posted this post has public account, anyone who logged in or not can see this post
      // @access  Private
      } else if (req.isAuthenticated()) { // user logged in
        if (!post.postedBy.isPublic) { // private account
          // req.user is following postedBy OR
          if (post.postedBy.followers.some(obj => obj.user == req.user.id) || 
          // req.user is postedBy (user's own post)
          (post.postedBy._id == req.user.id)) {
            // remove isPublic and followers from display
            post = post.toObject();
            delete post.postedBy.isPublic;
            delete post.postedBy.followers;
            
            // show post
            return res.json(post);
          } else { // req.user is not following OR not own post
            return res.json({ msg: "This account is private. Do you want to follow?" });
          }
        }
      } else { // accessing post from private account and user not logged in
        return res.json({msg: "This is a private account! Please log in."});
      }
    })
    .catch(err => res.status(500).json({success: false, error: err.message}));
});

// @route   DELETE api/posts/:id
// @desc    Delete post by postId
// @input   postId from request params
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // if there is no post with :id
          if(!post){
            return res.status(404).json({msg: 'Post not found'});
          }
          // check for post owner
          if (post.postedBy.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // delete ':id' post
          post.remove().then(() => res.json({ success: true , message: "Post deleted" }));
        })
        .catch(err => res.status(500).json({success: false, error: err.message}));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @input   postId from request params
// @access  Private
router.post(
    "/comment/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { errors, isValid } = validateCommentInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      Post.findById(req.params.id)
        .then((post) => {
            const newComment = {
              commentBody: req.body.commentBody,
              username: req.body.username,
              avatar: req.body.avatar,
              user: req.user.id,
            };

            // Add to comments array
            post.comments.unshift(newComment);

            // Save
            post.save().then((post) => res.json(post));
          })
            
        .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
    }
  );

  // @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);
  

module.exports = router;