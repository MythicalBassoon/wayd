
var db = require('../../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../../DB/psql/index.js');


module.exports.insertEmail = function(email, i, pollId, callback, database){
  db = database || db;
	var queryParameters = [email, pollId]
  
  //insert eventObj into eventObjs table
  return db.query(queryString.insertEmail, queryParameters)
  .then(function(emailId) {
    console.log('inserted email id is', emailId);
    return callback(null, emailId, i);
  })
  .catch(function(error){
    console.log('error inserting emailId to db, error is:', error);
    return callback(error, null, i);
  });
}


