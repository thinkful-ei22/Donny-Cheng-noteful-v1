'use strict';

// Load array of notes
const express = require('express');

const data = require('./db/notes');

const app = express();


console.log('Hello Noteful!');
app.use(express.static('public')); // serve static files

//note route 
app.get('/api/notes', (req, res) => {
  const query = req.query;
  let notes = data;
    
  if (query.searchTerm) {
    notes = notes.filter(note => (note.title).includes(query.searchTerm));
  }
        
  res.json(notes);
});

//named route parameter
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundNote = data.find(note => note.id === id);
  res.json(foundNote);
  
});




app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

// INSERT EXPRESS APP CODE HERE...
//const express = reqires('rexprserss);
//const app = express();

//app.use(express.static('pblic)');

//BUILD GET ROUTES
//has to be exact match
//app.get(/api/notes, (req,res) = > {

//});

//app.listen'(8080, () = > console.log))


//route matching and query strings

//