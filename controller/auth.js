const User = require('../models/User');

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
    User.findByIdAndRemove(req.user.id)
       .then(user => {
          //TODO: Delete all references
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
          }
          return res.json({ success: true, message: 'Account deleted' });
      })
      .catch(err =>{
        return res.status(500).json({ success: false, message: err.message })
      }
      );
  } //removeAccount ends here
}

function validateOldPassword(req, res, user) {

  const oldpassInput = req.body.oldpassword; //get old password from req.body
  const newpassword = req.body.newpassword; //get new password from req.body
  const existingDbpass = req.user.password; // get existing password from req.user

  //Check Old password is valid or not 
  bcrypt.compare(oldpassInput, existingDbpass)
    .then(isMatch => {
      if (isMatch) {
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
    user.password = hash;
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