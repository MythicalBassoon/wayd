var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var dateFormater = require('./Controllers/helpers.js').dateFormater;

var routes = require('./Routes/routes.js');
var app = require('./server.js');

describe('SERVER ROUTE TESTS:', function() {
 
  // need to delay running test for tests to pass. network requests over 2seconds often
  // RUN: mocha -t 5000 routesSpec.js

  describe('EVENTFUL API ROUTE: GET /api/events', function() {

    var url2 = '/api/events?loc=37.7841848,-122.4090309&timeframe="2016-02-28T05:01:23.513Z"';
    it('Send properly formed query to eventful api', function(done) {
      request(app)
        .get(url2)
        .expect(200)
        .end(done);
     });

    it('send 1 bad parameter in url string: old date', function(done) {
      request(app)
        .get('/api/events/?loc=37.7841848,-122.4090309&timeframe="2000-02-28T05:01:23.513Z"')
        .expect(200)
        .end(done);
     });

    it('send 1 bad parameters in url string: no events in location', function(done) {
    request(app)
      .get('/api/events/?loc=37.825568,-115.8095288&timeframe="2000-02-28T05:01:23.513Z"')
      .expect(200)
      .end(done);
    })

    it('missing 2 parameters, expecting success with empty value', function(done) {
    request(app)
      .get('/api/events/?loc=0,0&timeframe=""')
      .expect(200)
      .end(done);
    })

    it('reformat dates for api query', function(done) {
      var date1 = '"2016-01-27T22:43:29.175Z"';
      var dateFormated1 = dateFormater(date1);
      expect(dateFormated1).to.equal('2016012700');
      done();
    });

  });

});
