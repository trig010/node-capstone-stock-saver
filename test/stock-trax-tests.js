const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const should = chai.should();

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Stock Trax', function(){
    before(function() {
      return runServer();
    });
    after(function() {
      return closeServer();
    });

    it('should load the index.html file from the root url', function(){
        return chai.request(app)
        .get('/')
        .then(function(res) {
            res.should.have.status(200);
            res.should.be.html;
        });
    });
    it('should load the stocktrax.html file from the stocktrax url', function(){
        return chai.request(app)
        .get('/stocktrax')
        .then(function(res) {
            res.should.have.status(200);
            res.should.be.html;
        });
    });
    it('should return users', function(){
        return chai.request(app)
        .get('/users')
        .then(function(res) {
            res.should.have.status(200);
            res.should.be.json;
        });
    });
})
