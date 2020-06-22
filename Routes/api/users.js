const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const user = require('../../models/User');
const User = require('../../models/User');
const keys = require('../../config/keys');
const { session } = require('passport');
const validateLoginInput = require("../../validation/login");

// @route POST api/users/register
// @desc Register user
// @access Public 
router.post('/register', (req,res) => {
      //Validation
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  
    User.findOne({email: req.body.email})
        .then(user => {
            if (user){
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });    

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;

                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => console.log(err));
}) 

// @route POST api/users/login
// @desc Login user/returning a token
// @access Public 
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user => {
            if (!user){
                return res.status(404).json({email: 'User not found'});
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if (isMatch){
                        //Payload
                        const payload = {id: user.id, name: user.name, avatar: 
                        user.avatar};    
                        //sign token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 86400},
                            (err, token) => {
                                return res.json({
                                    token: 'Bearer' + token 
                                });
                            })    

                    } else {
                        return res.status(400).json({password: 'Password Incorrect'});
                    }
                })
        })
        .catch();
})

// @route GET api/users/current
// @desc Return current user
// @access Private 
router.get('/current',
  passport.authenticate('jwt', {session:false}),
(req,res) => {
    return res.json({msg:'Success'});
})

module.exports = router;