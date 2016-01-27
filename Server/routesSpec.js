var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var dateFormater = require('./Controllers/helpers.js').dateFormater

var db;
var routes = require('./Routes/routes.js')
var app = require('./server.js');

describe('SERVE ROUTE TESTS:', function() {

  describe('EVENTFUL API ROUTE: GET /api/events  ', function() {

    it('Send property formed query to eventful api', function(done) {
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

    it('missing 2 parameters in url string: location and date', function(done) {
    request(app)
      .get('/api/events/')
      .expect(404)
      .end(done);
    })

    it('reformat dates for api query', function(done) {
      var date1 = '2016-01-27T22:43:29.175Z'
      var date2 = 'January 27, 2016 11:13:00'

      var dateFormated1 = dateFormater(date2)
      var dateFormated2 = dateFormater(date2)

      expect(dateFormated1).to.equal('2016012700')
      expect(dateFormated2).to.equal('2016012700')

      done()
    })

  });

});
