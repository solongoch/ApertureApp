const express = require('express');
// Create the Express application
const app = express();

const users = require('./routes/api/user');
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

// Homepage route
app.get('/', (req, res) => res.send('Aperture'));

// Server listens on http://localhost:7500
app.listen(port, () => console.log(`Server has started on http://localhost:${port}`));

// Imports all of the routes
app.use('/api/users' , users);