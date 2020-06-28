const express = require('express');
// Create the Express application
const app = express();

const authRoutes = require('./routes/api/auth');
const users = require('./routes/api/users');
const follows = require('./routes/api/follows');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const bodyparser = require('body-parser');
const port = require('./config/keys').port;
const passport = require('passport');

// Configures the database and opens a global connection
const db = require('./config/database');

// Configure body parser
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

//This will initialize the passport object on every request
app.use(passport.initialize());

require('./config/passport')(passport);

// homepage route
app.get('/', (req, res) => res.send('Aperture')); 

// Imports all of the routes
app.use('/api/users', users);
app.use('/api', authRoutes)
app.use('/api', follows)
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server listens on http://localhost:7500
app.listen(port, () => console.log(`Server has started on http://localhost:${port}`));