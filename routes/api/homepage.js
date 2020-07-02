const router = require("express").Router();
const Post = require("../../models/Posts");
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");

// @route   GET 'http://localhost:7500'
// @desc    Landing page
// @access  Public and Private
router.get("", accessRouteWithOrWithoutToken, (req, res) => {
  if (!req.isAuthenticated()) {
    return res.json({ msg: "Do you want to log in or sign up?" });
  } else {
    const following = req.user.following;
    if (following.length === 0) {
      return res.json({ msg: "Accounts suggestion to follow" });
    }

    Post.find({ postedBy: { $in: following.map(following => following.user) } })
      .sort({ timePosted: -1 })
      .limit(10)
      .then(posts => {
        return res.send(posts);
      })
      .catch(err => { return res.send(err) });
  }
});

module.exports = router;