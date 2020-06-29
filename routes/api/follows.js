const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');


// @route   put api/follow/:userId
// @desc    Follow User
// @input   Get Userid from req params of person whom user wants to follow.
// @access  Private


router.put('/follow/:userId' ,passport.authenticate('jwt', {session: false} ), (req, res) =>{

  const idToFollow = req.params.userId
  
  // Add logged-in user to whom user wants to follow i.e follower's[] 
  User.findOneAndUpdate({user: idToFollow}, 
                          {$push : {followers:req.user.id}},
                          {new : true})
        .then( data => {
          console.log(idToFollow);
         //Add followerid-in Loggedin user"s following's[] 
         User.findOneAndUpdate({user:req.user.id}, 
          {$push : {following:idToFollow}},
          {new : true})              
          return res.json({success:true , message: "Successfully added"});
        })
        .catch(err => {
          return res.status(500).json({success:false , message: err.message});
        });
}); 


// @route   put api/unfollow/:userId
// @desc    Unfollow User
// @input   Get Userid from req params to whom user wants to unfollow.
// @access  Private

router.put('unfollow/:userId' ,passport.authenticate('jwt', {session: false} ), (req, res) =>{

  const idToUnfollow = req.params.userId

  //Pull loggedin-id from idToUnfollower's follower[] 
  User.findOneAndUpdate({user: idToUnfollow}, 
                           {$pull : {followers:req.user.id}},
                           {new : true})
        .then( data => {
          //Pull idtoUnfollow from loggedinuser's i.e following[] 
          User.findOneAndUpdate({user:req.user.id}, 
          {$pull : {following:idToUnfollow}},
          {new : true})              
          return res.json({success:true , message: "Successfully added"});
        })
        .catch(err => {
          return res.status(500).json({success:false , message: err.message});
        });
}); 

module.exports =router;