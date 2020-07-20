const express = require('express');
const fileUpload = require('express-fileupload');
// Create the Express application
const app = express();
// Load APIs
const homepage = require('./routes/api/homepage');
const authRoutes = require('./routes/api/auth');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const follows = require('./routes/api/follows');
const suggestion = require('./routes/api/suggestion');

const bodyparser = require('body-parser');
const port = require('./config/keys').port;
const passport = require('passport');
const optionalJWT = require('./controller/accessRouteWithWithoutToken');

//for avatar file upload//
app.use(fileUpload());

//Upload Endpoint
app.post('/upload', (req, res) => {
  if(req.files === null) {
    return res.status(400).json({msg: 'No file upload'});
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if(err){
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
  })

});

// Configures the database and opens a global connection
const db = require('./config/database');

// Configure body parser
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//This will initialize the passport object on every request
app.use(passport.initialize());
require('./config/passport')(passport);

// Landing page route
app.get('/',
  optionalJWT,
  (req, res) => {
    // if user logged in
    if (req.isAuthenticated()) {
      // suggest accounts to user who didn't follow anyone
      if(req.user.following.length < 1) {
        res.redirect('/api/suggestion');
      // if user followed someone, redirect to homepage
      } else {
        res.redirect('/api/home');
      }
    // if user not logged in, redirect to Login page
    } else {
      res.redirect('/api/users/login');
    }
  });

// Imports all of the routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api', authRoutes);
app.use('/api', follows);
app.use('/api', suggestion);
app.use('/api', homepage);

// Server listens on http://localhost:7500
app.listen(port, () => console.log(`Server has started on http://localhost:${port}`));