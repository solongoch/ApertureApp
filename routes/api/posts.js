const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Posts");
// User model
const User = require("../../models/User");

// Validation
const validateCommentInput = require("../../validation/comment");

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
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
            commentedBy: req.body.commentedBy
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
