const express = require('express');
const app = express();
const mongoose = require('mongoose');

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDb
mongoose.connect(db)
  .then(() => console.log('MongoDb connected.'))
  .catch(err => console.log(err));

// Homepage route
app.get('/', (req, res) => res.send('Aperture'));

const port = 7500;
app.listen(port, () => console.log(`Server is running on port ${port}.`));