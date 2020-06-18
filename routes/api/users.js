const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: 'Users work!'}));
// @route   POST api/users/register
// @desc    Register user 
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists.'});
      } else {
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile
        });

        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log('couldn\'t save newUser'));
      }
    })
    .catch(err => console.log('couldn\'t find one'));
})

module.exports = router;