const express = require('express');
const router = express.Router();
const passport = require('passport');

//import controller to separte the actuall logic of the route.
const {changepassword, removeAccount } = require('../../controller/auth');

// @route   POST http://localhost:7500/api/changepassword
// @desc    Change current user passoword 
// @access  Private
router.post('/changepassword', passport.authenticate('jwt',{session : false}), changepassword);

// @route   DELETE http://localhost:7500/api/remove
// @desc    Delete current User Account 
// @access  Private
router.delete('/remove', passport.authenticate('jwt',{session : false}), removeAccount);

module.exports = router;
