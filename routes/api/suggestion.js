const express = require("express");
const router = express.Router();
const passport = require("passport");
// Model
const User = require("../../models/User");

// @route   Post api/suggestion
// @desc    Suggest accounts to user who didn't follow anyone
// @access  Private
router.get(
  "/suggestion",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ $and: [
      // not suggesting user himself
      { _id: { $ne: req.user.id } },
      // not suggesting accounts user already followed
      { _id: { $nin: req.user.following.map(obj => obj.user) } }
      ]},
      // get name, username, avatar and followers fields
      { name: 1, username: 1, avatar: 1, followers: 1 })
        // sort by followers number
        .sort({ followers: -1 })
        .then(accounts => {
          return res.send(accounts);
        })
        .catch(err => {
          return res.json(err);
        });
  }
);

module.exports = router;