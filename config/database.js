const mongoose = require('mongoose');

//connection String
const conStr = require('./keys').mongoURI;

//connect mongoDB
const db = mongoose.connect(conStr, { useNewUrlParser: true, useUnifiedTopology: true,
   useCreateIndex: true , useFindAndModify: false})
  .then(() => { console.log("Successfully connected to the database"); })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err.message);
    process.exit();
  });
 
 module.exports =  db;
  