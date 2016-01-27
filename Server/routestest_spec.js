var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var dateFormater = require('./Controllers/helpers.js').dateFormater

var db;
var routes = require('./Routes/routes.js')
var app = require('./server.js');

describe('SERVE ROUTE TESTS:', function() {

  describe('EVENTFUL API ROUTE ', function() {

    it('send basic get request to correct route', function(done) {
      request(app)
        .get('/api/events/37.7841848,-122.4090309/2016-01-28T05:01:23.513Z') //may need to change date in future testing
        .expect(200)
        .end(done);
     });

    it('send 1 bad parameters in url string: missing date', function(done) {
      request(app)
        .get('/api/events/37.7841848,-122.4090309')
        .expect(404)
        .end(done);
     });

    it('send 1 bad parameters in url string: bad location', function(done) {
    request(app)
      .get('/api/events/1234,1234')
      .expect(404)
      .end(done);
    })

    xit('send 2 bad parameters in url string: location and date', function(done) {
    request(app)
      .get('/api/events/1234/2016-01-28T05:01:23.513Z')
      .expect(404)
      .end(done);
    })

    it('reformat dates for api query', function(done) {

      var dateFormated = dateFormater('January 27, 2016 11:13:00')
    
      expect(dateFormated).to.equal('2016012700')

      done()
    })

  });

});
