const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   Get http://localhost:7500/api/profile/username/:username
// @desc    Return current user
// @access  Public

router.get('/:username', (req,res) =>{
  console.log("getUsername");
  const userName = {username:req.params.username}

  User.findOne(userName , {"_id":0,'name': 1, 'username': 1, 'avatar': 1})
      .then( user => {
        if(user){
          //TODO to fetch user followers and following and post count
           return res.json({ success : true, message: user });        
        } 
        return res.status(404).json({ success: false, message: 'There is no profile for this user' });
      })
      .catch( err =>{
        return res.status(500).json({ success: false, message: err.message });
      });
  
  });

module.exports = router;