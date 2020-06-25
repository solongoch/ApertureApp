const express = require('express');
const router = express.Router();
const passport = require('passport');

//import controller to separte the actuall logic of the route.
const {changepassword} = require('../../controller/auth');

// @route   POST http://localhost:7500/api/changepassword
// @desc    Return Change current user passoword 
// @access  Private
router.post('/changepassword', passport.authenticate('jwt',{session : false}), changepassword);

module.exports = router;
