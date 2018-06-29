'use strict';

//import required 
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

//Test for static server should return index page
describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
  
});
  
//Test for 404 handler when given a bad path
describe('404 handler', function () {
  
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
  
});

//Test for GET/API/notes
//should return the default of 10 Notes as an array
//should return an array of objects with the id, title and content
//should return correct search results for a valid query
//should return an empty array for an incorrect query
describe('GET TESTS', function(){
  it('should respond with the default notes as an array (at least 10 by default)' , function() {

    return chai
      .request(app)
      .get('/api/notes')
      .then(function(res){
        expect(res.body).to.be.a('array'); //checks that it is an array
        expect(res.body.length).to.be.at.least(10); //checks to see if there are at least 10 notes

      });
  });

  it('should return an array of objects with the id, title and content', function(){

    return chai
      .request(app)
      .get('/api/notes')
      .then(function(res){
        const expectedKeys = ['id','title','content'];
        res.body.forEach(function(item){
          expect(item).to.be.a('object');  // sees if each item is an object
          expect(item).to.include.keys(expectedKeys);  // see if item has the required keys
        });
      });

  });

  it('should return correct search results for a valid search query', function(){

    return chai
      .request(app)
      .get('/api/notes/?searchTerm=gaga')
      .then(function(res){    
        expect(res).to.have.status(200);  //if it returns 200 then item is found
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);

      });
  });

  it('should return an empty array for an incorrect query', function(){

    return chai
      .request(app)
      .get('/api/notes/?searchTerm=doink25278394238479')
      .then(function(res){    
        expect(res).to.have.status(200);  //if it returns 200 then item is found
        expect(res.body).to.be.a('array');
        expect(res.body.length).equal(0);

      });
  });
});


//TESTS for GET api/notes/:id

describe('GET tests for specific notes ID', function() {

  it('should return correct note object with id, title and content for a given id', function(){

    return chai
      .request(app)
      .get('/api/notes/1008')
      .then(function(res){
        const expectedKeys = ['id','title','content'];
        expect(res).to.have.status(200); 
        expect(res.body).to.be.a('object');
        expect(res.body.id).equals(1008);
        expect(res.body).to.include.keys(expectedKeys); 
        
      });
  });


  it('should respond with a 404 for an invalid id (/api/notes/DOESNOTEXIST)', function(){
    
    return chai
      .request(app)
      .get('/api/notes/1djff198273048219garbagebla')
      .then(function(res){
        expect(res).to.have.status(404);
        expect(res.body.message).equals('Not Found');
      });

  });
});


//TESTS for POST /api/notes
describe('POST tests for notes', function() {

  it('should create and return a new item with location header when provided valid data', function(){
    const newItem = { title: 'This is a test', content: 'This is test content' };
    return chai
      .request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function(res){
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(
          Object.assign(newItem, { id: res.body.id })
        );
        expect(res).to.have.header('location');
      });
  });



  it('should return an object with a message property "Missing title in request body" when missing "title" field',function(){
    const newItem = {content:'This is no title content'};
    return chai
      .request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function(res){
        expect(res).to.have.status(400);
        expect(res.body.message).equals('Missing `title` in request body');

      });
  });

});
            