'use strict';

// Load array of notes
console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');
const router  = require('./router/notes.router');


const app = express();

//const {requestLogger} = require('./middleware/logger');

//Create a static webserver
app.use(express.static('public'));

//Parse request body into JSON
app.use(express.json());

//router
app.use('/api', router);

//use morgan logger for all 
app.use(morgan('dev'));

//log all requests
//app.use(requestLogger);



//wrapping app.js so the express app can be required and used in our test files
if(require.main === module){
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports=app; //export for testing