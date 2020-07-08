const express = require("express");
const router = express.Router();
const passport = require("passport");
// Model
const User = require("../../models/User");

// @route   Post api/suggestion
// @desc    Suggest accounts to user who didn't followed anyone
// @access  Private
router.get(
  "/suggestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.following.length < 1) {
      User.find({}, { name: 1, username: 1, avatar: 1, followers: 1 })
        .sort({ followers: -1 })
        .limit(10)
        .then(accounts => {
          return res.json({'Suggestion': accounts});
        })
        .catch(err => {
          return res.json(err);
        });
    }
  });

module.exports = router;
