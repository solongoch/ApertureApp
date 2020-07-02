const router = require("express").Router();
// Model
const Post = require("../../models/Posts");
// Function
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");

// @route   GET 'http://localhost:7500'
// @desc    Landing page
// @access  Public and Private
router.get("", accessRouteWithOrWithoutToken, (req, res) => {
  // if user not logged in
  if (!req.isAuthenticated()) {
    // display logIn/SignUp page
    return res.json({ msg: "Do you want to log in or sign up?" });
  } else {
    const following = req.user.following;

    // if user didn't follow anyone
    if (following.length === 0) {
      // suggest someone to follow
      return res.json({ msg: "Accounts suggestion to follow" });
    }

    Post.find({ postedBy: { $in: following.map(following => following.user) } }) // check postedBy user is in following
      .sort({ timePosted: -1 }) // sort post date by descending order
      .limit(10)
      .then(posts => {
        return res.send(posts);
      })
      .catch(err => { return res.send(err) });
  }
});

module.exports = router;