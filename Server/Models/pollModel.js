var db = require('../../db/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../../db/psql/');


module.exports.insertPoll = function(eventId, userId, numParticipants, callback, testMode){
  if (testMode){
    db = require('../../db/testConfig.js');
  }
  //hardcoding parameter values for testing purposes only!

  // eventId = 1;
  // userId = 1;
  // numParticipants = 4;
  // callback = function(x) {console.log(x)};


  // array of values which will be inserted to polls table
  // first parameter (vote_count) is defaulted to 1 as we assume creator has voted in favor for event by selecting it
  var queryParameters = [1, numParticipants, userId, eventId]
  
  //insert poll into polls table
  return db.query(queryString.insertPoll, queryParameters)
    .then(function(pollId) {
      console.log('inserted poll id is', pollId);
      return callback(pollId);
    })
    .catch(function(error){
      console.log('error inserting poll to db, error is:', error);
      return callback(error);
    });
}

  //putting this here for future use if we build view component showing current status of poll
  module.exports.getOnePoll = function(pollId, callback, testMode){
    if (testMode){
      db = require('../../db/testConfig.js');
    }
    //hadrcoding parameters below for testing purposes only!
    // callback = function(x) {console.log(x)};
    // pollId = 1;

    return db.query(queryString.getOnePoll, pollId)
      .then(function(poll) {
        console.log('retrieved poll is', poll);
        return callback(poll);
      })
      .catch(function(error){
        console.log('error getting poll, error is:', error);
        return callback(error, null);
      });
  }


//module.exports.insertPoll();
//module.exports.getOnePoll();

