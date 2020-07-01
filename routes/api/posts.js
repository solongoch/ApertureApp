const express = require("express");
const router = express.Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');
const validatePostInput = require('../../validation/posts');
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");

router.get("/test", (req, res) => res.json({ msg: "Posts works!" }));

// @route   Post api/posts/create
// @desc    Create Post 
// @input   Postid from request params
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

// @route   GET api/posts
// @desc    Get posts
// @access  Private
router.get("/", 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No post found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public and Private
router.get("/:id", accessRouteWithOrWithoutToken, (req, res) => {
  Post.findById(req.params.id)
    .populate("postedBy", ["_id", 'name', "isPublic", "followers"])
    .then(post => {
      // if post author's account is public, show post
      if (post.postedBy.isPublic) {
        // remove isPublic and followers from display
        post = post.toObject();
        delete post.postedBy.isPublic;
        delete post.postedBy.followers;

        // show post
        res.json(post);

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
            res.json(post);
          } else { // req.user is not following OR not own post
            res.json({ msg: "This account is private. Do you want to follow?" });
          }
        }
      } else { // accessing post from private account and user not logged in
        res.send("This is a private account! Please log in.");
      }
    });
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check for post owner
          if (post.postedBy.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // delete ':id' post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
