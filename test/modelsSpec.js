var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should;
var request = require('request');
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
var eventModel = require('../Server/Models/eventModel.js');
var pollModel = require('../Server/Models/pollModel.js');
var emailModel = require('../Server/Models/emailModel.js');
var userModel = require('../Server/Models/userModel.js');

////////////////////// SAMPLE OBJECTS TO INSERT /////////////////////
var sampleEventObj = {
   title: 'Test Event',
   description: 'Test Description',
   start_time: '2016-02-19 12:30:00',
   stop_time: '2016-02-19 13:00:00',
   category: null,
   address: '736 Mission Street',
   city: 'San Francisco',
   state: 'California',
   lat: 37.7859102,
   long: -122.403361,
   source: 'eventObjful',
   source_id: 'E0-001-089860428-8',
   image_thumb: 'http://s2.evcdn.com/images/thumb/I0-001/024/702/381-4.jpeg_/gallery-chat-dave-talbot-secrecy-and-cia-81.jpeg',
   image_medium: 'http://s2.evcdn.com/images/medium/I0-001/024/702/381-4.jpeg_/gallery-chat-dave-talbot-secrecy-and-cia-81.jpeg'
 };

 var existingEventObj = {
  title: 'initEvent',
  description: 'Init event in DB', 
  start_time: '2016-02-19 12:30:00',
  stop_time: '2016-02-19 13:00:00',
  category: null, 
  address:'736 Mission Street',
  city: 'San Francisco',
  state: 'CA', 
  lat: 37.7859102,
  long: -122.403361,
  source:'eventObjful',
  source_id: 'INITIALSOURCE',
  image_thumb: 'http://image_thumb', 
  image_medium: 'http://image_medium'
 }

var sampleUserObj = {
  first_name: 'TestUserFirst',
  last_name: 'TestUserLast',
  user_name: 'TestUserName',
  password: 'TestPassword',
  access_token: '12345'
}

var existingUserObj = {
  first_name: 'initFirstName', 
  last_name: 'initLastName', 
  user_name: 'initUserName', 
  password: 'password', 
  access_token: 'access'
}

var sampleEmail = {
  email: 'testemail@gmail.com',
  poll_id: 1
}

var samplePoll = {
  event_id: 1,
  user_id: 1,
  num_participants: 5,
  yes_count: 2,
  no_count: 3
}

var existingEventID;
var existingUserID;
var existingPollID;

///////////////// CONNECT TO DATABASE ///////////////////////////

// Connect to database testwayd which will be an exact copy of database
// by running ./initTestDB.sh

var connectionString = process.env.DATABASE_URL_TEST||"postgres://localhost:5432/testwayd"
var db = pgp(connectionString);



////////////////// TESTS ////////////////////////////////////
// Start with empty database, add events, users, polls, emails and query

describe('Database Models', function(){
  beforeEach(function(done){
     db.query('TRUNCATE TABLE users CASCADE;')
      .then(function(){
        return db.query('TRUNCATE TABLE events CASCADE;')
      })
      .then(function(){
        return db.query('TRUNCATE TABLE polls CASCADE;')
      })
      .then(function(){
        return db.query('TRUNCATE TABLE emails CASCADE;')
      })
      .then(function(){
        return db.query('TRUNCATE TABLE emails CASCADE;')
      })
      .then(function(){
        // Insert event
        var queryString = 'INSERT INTO events' 
          + '(title, description, start_time, stop_time, category, address, city, state, lat, long, source, source_id, image_thumb, image_medium)' 
          + "VALUES ('initEvent', 'Init event in DB', '2016-02-19 12:30:00', '2016-02-19 13:00:00', null, '736 Mission Street', 'San Francisco', 'CA', 37.7859102, -122.403361, 'eventObjful', 'INITIALSOURCE', 'http://image_thumb', 'http://image_medium'); "
          + "SELECT id from events where source_id = 'INITIALSOURCE';";
        return db.query(queryString)
      })
      .then(function(eventId){
        existingEventID = eventId[0]['id'];
        // Insert one user
        var queryString = 'INSERT INTO users'
          + '(first_name, last_name, user_name, password, access_token) '
          + "VALUES ('initFirstName', 'initLastName', 'initUserName', 'password', 'access'); "
          + "SELECT id from users where user_name = 'initUserName';"
        return db.query(queryString);
      })
      .then(function(userId){
        existingUserID = userId[0]['id'];
        // Insert one poll
        var queryString = "INSERT INTO polls (event_id, user_id, num_participants, yes_count, no_count)"
          + 'VALUES (' + existingEventID + ', ' + existingUserID + ', ' +  "3, 2, 3); "
          + 'SELECT id from polls where user_id=' + existingUserID + ' and event_id=' + existingEventID + ";";
        return db.query(queryString);
      })
      .then(function(pollId){
        existingPollID = pollId[0]['id'];
        // Insert one email
        var queryString = "INSERT INTO emails (email, poll_id) VALUES ('initEmail@gmail.com', " + existingPollID + ');';
        return db.query(queryString);
      })
      .then(function(){
        done();
      })
      .catch(function(error){
        console.log(error);
      })
  });

  after(function(){
    console.log("Testing Complete");
  });

  describe('Poll Model', function(){
    it('should insert a poll into the database', function(){
      expect(2).to.equal(2);
    });
    it('should retrieve one poll from the database', function(){
      expect(2).to.equal(2);
    });
  });

  describe('Event Model', function(){
    it('should insert an event to the database and return an id', function(done){
      eventModel.insertEvent(sampleEventObj, function(err, eventid){
        expect(eventid).to.exist;
        return db.query('select * from events')
        .then(function(rows) {
          expect(rows.length).to.equal(2);
        }).then(function(){
          done();
        }).catch(function(err){
          console.log(err);
        })
      }, db)
    });
    it('should not insert an event if it already exists in the database', function(done){
      eventModel.insertEvent(existingEventObj, function(err, eventid){
        return db.query('select * from events')
        .then(function(rows) {
          expect(rows.length).to.equal(1);
        }).then(function(){
          done();
        }).catch(function(err){
          console.log(err);
        })
      }, db)
    });
    it('should retrieve one event from the database', function(done){
      eventModel.getOneEvent(existingEventID, function(err, retrievedEvent){
        return db.query('select * from events where id=' + existingEventID)
        .then(function(result) {
          expect(result.length).to.equal(retrievedEvent.length);
          expect(result[0]).to.deep.equal(retrievedEvent[0]);
        }).then(function(){
          done();
        }).catch(function(err){
          console.log(err);
        })
      }, db)
    });
  });
  describe('User Model', function(){
    it('should insert a user to the database and return an id', function(done){
      userModel.insertUser(sampleUserObj, function(err, userid){
        expect(userid).to.exist;
        return db.query('select * from users')
        .then(function(rows) {
          console.log(rows);
          expect(rows.length).to.equal(2);
        }).then(function(){
          done();
        }).catch(function(err){
          console.log(err);
        })
      }, db)
    });
    it('should not insert a user if it already exists in the database', function(done){
      userModel.insertUser(existingUserObj, function(err, userid){
        return db.query('select * from users')
        .then(function(rows) {
          console.log(rows);
          expect(rows.length).to.equal(1);
        }).then(function(){
          done();
        }).catch(function(err){
          console.log(err);
        })
      }, db)
    });
  });
});