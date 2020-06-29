const User = require('../models/User');
const Post = require('../models/Posts');
//Imported for ChanagePassword Logic
const changePasswordInput = require('../validation/changepassword');
const bcrypt = require('bcryptjs');

module.exports = {
  changepassword: (req, res) => {
    //Validations
    const { errors, isValid } = changePasswordInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }
    //check that user exists in db
    User.findById(req.user.id)
      .then(user => {
        if (user) {
          validateOldPassword(req, res, user);
        } else {
          res.status(404).send({
            message: 'User is not found'
          });
        }
      })
      .catch(err =>
        res.status(500).json({ success: false, message: err.message }));//User check ends here
  },  // changepassword logic ends
  removeAccount: (req, res) => { //removeAccount
    User.findById(req.user.id, (err, user, next) => {
      if (err) return next(err.message);
      //delete Posts comments etc of the user
      Post.deleteOne({ postedBy: { $in: user.id }}, (err,follow)=>{ 
        if (err) return next(err.message);
        //delete User account,follower,following
        User.deleteOne({ _id: req.user.id }, function (err, row) {
          if (row) 
            res.json({ success: true, message: 'Your Account deleted' });
        });
      });
    });
  }//removeaccount ends
}//module.exports ends

function validateOldPassword(req, res, user) {
  const oldpassInput = req.body.oldpassword; //get old password from req.body
  const newpassword = req.body.newpassword; //get new password from req.body
  const existingDbpass = req.user.password; // get existing password from req.user

  //Check Old password is valid or not 
  bcrypt.compare(oldpassInput, existingDbpass)
    .then(isMatch => {
      if (isMatch) {//If correct old
        hashAndUpdatePassword(newpassword, res, user);
      }
      else { //old password doesnot match
        return res.status(401).json({
          success: false,
          message: 'Incorrect old password'
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    });
}

//New password hashed and saved in db
function hashAndUpdatePassword(newpassword, res, user) {
  //set salt rounds
  const saltRounds = 10;
  //auto-gen a salt and hash
  bcrypt.hash(newpassword, saltRounds, (err, hash) => {
    if (err) throw err;
    user.password = hash; //assign new hashed pwd to user 
    //update password in db
    user.save()
      .then(user => {
        return res.json({ success: true, message: 'Password successfully changed!' });
      })
      .catch(err => {
        return res.status(500).json({ success: false, message: err.message });
      });//password updated ends
  });//hash ends
} //hashAndUpdatePassword ends