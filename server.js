const express = require('express');
const app = express();
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected.'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.send('Aperture')); // homepage
app.use('/api/users', users); 
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 7500;
app.listen(port, () => console.log(`Server is running on port ${port}.`));