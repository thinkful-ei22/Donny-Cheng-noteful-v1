
'use strict';

//create express instance
const express = require('express');
//router
const router = express.Router();



//our SIMDB Notes
const data = require('../db/notes');

const simDB = require('../db/simDB');

const notes = simDB.initialize(data);


router.get('/', (req, res) => {
  res.json(data.get());
});
  
  
// Endpoints
//updated get endpoints to use SIMDB

router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  /*
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
  */

  notes.filter(searchTerm) 
    .then(list => {
      if(list){
        res.json(list);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


//individual notes
router.get('/notes/:id', (req, res, next) => {
  const {id} = req.params;
  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// Post (insert) an item
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;
  
  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  /*
  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
    */

  notes.create(newItem)
    .then (item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch (err => {
      next(err);
    });
});


//Update an Item
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  console.log(req.body);
  console.log(updateObj);

  /* non promise version
  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
  */

  notes.update(id, updateObj)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });

});


//Delete an item
router.delete('/notes/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(req.params.id);
  
  /*
  notes.delete(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
  */

  notes.delete(id)
    .then(item => {
      if(item){
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// 404
router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

//Errors
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


//Export router
module.exports = router;