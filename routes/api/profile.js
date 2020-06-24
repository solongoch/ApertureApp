const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// load Validations
const validateProfileInput = require('../../validation/profile');

router.get("/test", (req, res) => res.json({ msg: "Profile works!" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // check validation
    if (!isValid) {
      // if it's not valid return referring error message
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    // if (req.body.username) profileFields.username = req.body.username;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // if (req.body.email) profileFields.email = req.body.email;
    if (req.body.mobile) profileFields.mobile = req.body.mobile;
    if (req.body.gender) profileFields.gender = req.body.gender;

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          // update profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true}
          ).then((profile) => res.json(profile));
        } else {
          // create profile

          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              if (profile) {
                errors.handle = "Handle already exists";
                return res.status(400).json(errors);
              }

              // save profile
              new Profile(profileFields)
                .save()
                .then((profile) => res.json(profile));
            });
        }
      });
  }
);

module.exports = router;
