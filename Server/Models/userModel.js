//to be defined once auth is implemented
var db = require('../../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../../DB/psql/index');


module.exports.insertUser = function(user, callback, database){
  db = database || db;
  //hardcoding parameter values for testing purposes only!

  // eventId = 1;
  // userId = 1;
  // numParticipants = 4;
  // callback = function(x) {console.log(x)};


  // array of values which will be inserted to polls table
  // first parameter (vote_count) is defaulted to 1 as we assume creator has voted in favor for event by selecting it
  //POLLINFO: userId, array of emails
  var queryParameters = [user.user_first_name, user.user_last_name, user.user_email, user.user_id, user.user_id]
  
  //insert poll into polls table
  return db.query(queryString.insertUser, queryParameters)
    .then(function(userId) {
      //console.log('inserted user id is', userId);
      return callback(null, userId);
    })
    .catch(function(error){
      //console.log('error inserting user to db, error is:', error);
      return callback(error, null);
    });
}
