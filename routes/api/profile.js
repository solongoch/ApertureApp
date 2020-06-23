const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/test', (req,res) => res.json({msg: 'Profile works!'}))

module.exports = router;