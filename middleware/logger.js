
'use strict';

function requestLogger(req,res, next){
  const now = new Date();
  console.log(
    `${now.toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
}



module.exports = {requestLogger};