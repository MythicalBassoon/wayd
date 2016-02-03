var db = require('../../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../../DB/psql/index');


module.exports.insertPoll = function(eventId, pollInfo, callback, testMode){
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
  //POLLINFO: userId, array of emails
  console.log(pollInfo)
  var queryParameters = [eventId, pollInfo.user.userId, pollInfo.emails.length]
  
  //insert poll into polls table
  return db.query(queryString.insertPoll, queryParameters)
    .then(function(pollId) {
      console.log('inserted poll id is', pollId);
      return callback(null, pollId);
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

//this method checks if a vote has already been recording for email/poll combination
module.exports.checkVoted = function(emailId, callback) {
  console.log('emailId is', emailId);

  console.log('about to run checkVoted query:');
  console.log(queryString.checkVoted);
  console.log('emailId is', emailId)
  return db.query(queryString.checkVoted, [emailId])
          .then(function(pollObj){
            ('in model, pollObj is', pollObj);
            callback(null, pollObj)
          })
          .catch(function(error) {
            console.log('in model, error querying emails table for poll, error is', error)
            callback(error, null);
          });

}

module.exports.toggleVoted = function(emailId, callback) {
  return db.query(queryString.toggleVoted, [emailId])
    .then(function(pollObj){
      callback(null, pollObj[0])
    })
    .catch(function(error) {
      console.log('error toggling "voted" emails table for poll, error is', error)
      callback(error, null);
    })
}

//this method incremennts the value in the yes_vote comment of specified poll
module.exports.incrementYesVote = function(pollId, callback) {
  console.log('about to increment, pollId is', pollId);
  return db.query(queryString.incrementYesVote, [pollId])
          .then(function(voteCount){
            callback(null, voteCount)
          })
          .catch(function(error) {
            console.log('error querying polls table for yes votecount, error is', error)
            callback(error, null);
          });
};

//this method incremennts the value in the no_vote comment of specified poll
module.exports.incrementNoVote = function(pollId, callback) {
  return db.query(queryString.incrementNoVote, [pollId])
          .then(function(voteCount){
            callback(null, voteCount)
          })
          .catch(function(error) {
            console.log('error querying emails table for no votecount, error is', error)
            callback(error, null);
          });

};

