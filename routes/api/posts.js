const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Posts");
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");

router.get("/test", (req, res) => res.json({ msg: "Posts works!" }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", accessRouteWithOrWithoutToken, (req, res) => {
  Post.findById(req.params.id)
    .populate("postedBy", ["_id", "isPublic", "followers"])
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
      } else if (req.isAuthenticated()) {
        if (!post.postedBy.isPublic) {
          if (post.postedBy.followers.includes(`\{ user: ${req.user.id} \}`)) {
            // remove isPublic and followers from display
            post = post.toObject();
            delete post.postedBy.isPublic;
            delete post.postedBy.followers;
            res.json(post);
          } else {
            res.json({ msg: "This account is private. Do you want to follow?" });
          }
        }
      } else {
        res.send("This is a private account!");
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
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
