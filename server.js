const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const mongoose = require('mongoose');

//Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDb
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('MongoDb connected.'))
.catch(err => console.log(err));

// Homepage route
app.get('/', (req, res) => res.send('Aperture'));

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7500;
app.listen(port, () => console.log(`Server is running on port ${port}.`));