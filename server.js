const express = require('express');
const {cloudinary} = require('./client/src/components/config/keys');
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

//Retrieve Profile Avatar
app.get('/api/images', async (req, res) => {
  const {resources} = await cloudinary.search.expression
  ('folder:dev_setups')
  .sort_by('public_id', 'desc')
  .max_results(1)
  .execute();
  const publicIds = resources.map( file => file.public_id);
  res.send(publicIds);
})

//Post Avatar
//Upload Profile Avatar
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true}));

app.post('/api/upload', async (req, res) =>{
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.
    upload(fileStr, {
      upload_preset: 'dev_setups'
    })
    console.log(uploadedResponse);
    res.json({msg: "Upload successful"})
  } catch(error) {
    console.error(error);
    res.status(500).json({err:'Something went wrong'})
  }
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