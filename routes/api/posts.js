const express = require('express');
const router = express.Router();
const passport = require('passport');
const Posts = require('../../models/Posts');
const User = require('../../models/User');

router.get('/test', (req,res) => res.json({msg: 'Posts works!'}))

module.exports = router;