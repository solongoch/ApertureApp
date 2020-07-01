const router = require('express').Router();
const passport = require('passport');
const Post = require('../../models/Posts');
const User = require('../../models/User');
const accessRouteWithOrWithoutToken = require("../../controller/accessRouteWithWithoutToken");

// @route   GET api/posts
// @desc    Get posts
// @access  Private
router.get('', 
  accessRouteWithOrWithoutToken, 
  (req, res) => {
    User.find({user: req.user.following})
      // .sort({ date: -1 })
      .then(following => {
        // console.log(req.user.id)
        // console.log(req.user.following)
        // console.log(following)
        if (!req.isAuthenticated()) {
          res.send('msg: Do you want to log in?');
        }
        if (req.user.following.length == 0) {
          res.json({'msg':'Accounts suggestion to follow'})
        }
        res.json(posts);
      })
      .catch(err => res.json(err));
});

module.exports = router;
