/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

require('../DB/testSchema.js');
var db = require('../../DB/testConfig.js');
var eventModel = require('./eventModel.js');
var pollModel = require('./pollModel.js');
var expect = require('../../node_modules/chai/chai').expect;

describe("Models Insert Polls and Events to database", function() {
  var dbConnection;

  // beforeEach(function(done) {
  //   dbConnection = mysql.createConnection({
  //     user: "root",
  //     password: "",
  //     database: "chat"
  //   });
  //   dbConnection.connect();

  //      var tablename = ""; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
  //   dbConnection.query("truncate " + tablename, done);
  // });

  // afterEach(function() {
  //   dbConnection.end();
  // });

  it("Should insert event into DB", function(done) {
    // should insert event into DB

    eventObj = {
     title: 'Gallery Chat: Dave Talbot on Secrecy and the CIA',
     description: 'Salon.com founder David Talbot has explored the relationship between power and secrecy throughout his career. He discusses his book The Devil’s Chessboard: Allen Dulles, the CIA, and the Rise of America’s Secret Government in conjunction with the exhibition Chasing Justice.\n\nKirkus Reviews called Dave Talbot’s The Devil&#39;s Chessboard: Allen Dulles, the CIA and the Rise of America&#39;s Secret Government, “a frightening biography of power, manipulation and outright treason,” encouraging “all engaged American citizens [to] read this book and have their eyes opened.” Talbot is also the author of the national bestseller, Season of the Witch, which was selected by the San Francisco Public Library for this year&#39;s One City, One Book campaign. He is also the author of the New York Times bestseller, Brothers: The Hidden History of the Kennedy Years. Talbot is the founder and former editor-in-chief of Salon, and has been hailed as “pioneer of web journalism” by the New York Times.',
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

    var testEventId

    eventModel.insertEvent(eventObj, function(err, eventId) {
      if err throw err;
      console.log(eventid)
      testEventId = eventId;
      expect(eventId).to.exist;
      done()
    })

    
  });

  // it("Should output all messages from the DB", function(done) {
  //   // Let's insert a message into the db
  //      var queryString = "";
  //      var queryArgs = [];
  //   // TODO - The exact query string and query args to use
  //   // here depend on the schema you design, so I'll leave
  //   // them up to you. */

  //   dbConnection.query(queryString, queryArgs, function(err) {
  //     if (err) { throw err; }

  //     // Now query the Node chat server and see if it returns
  //     // the message we just inserted:
  //     request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
  //       var messageLog = JSON.parse(body);
  //       expect(messageLog[0].text).to.equal("Men like you can never change!");
  //       expect(messageLog[0].roomname).to.equal("main");
  //       done();
  //     });
  //   });
  // });
});



