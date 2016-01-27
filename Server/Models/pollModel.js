//var db = require('../../db/psql/insertUser.js');
var queryString = require('../../db/psql/insertPoll');
// var db = require('../../db/config.js');


module.exports.insertPoll = function(eventId, userId, numParticipants, callback){

  //array of values which will be inserted to clients table
  var queryParameters = [1, numParticipants, userId, eventId]
  
  //INSERT CLIENT TO CLIENT TABLE
  return db.query(queryString, queryParameters)
  .then(function(pollId) {
    console.log('inserted poll id is', pollId);
    return callback(pollId);
  })
  .catch(function(error){
    console.log('error inserting poll to db, error is:', error);
    return callback(error, null);
  });

  module.exports.getOnePoll = function(pollId, callback){
    
}
