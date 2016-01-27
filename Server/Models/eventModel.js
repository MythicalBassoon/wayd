//var db = require('../../db/psql/insertUser.js');
var queryString = require('../../db/psql/insertEvent');
// var db = require('../../db/config.js');


module.exports.insertEvent = function(event, callback){

  //array of values which will be inserted to clients table
	var queryParameters = [event.title, event.description, event.start_time, event.stop_time, event.category, event.address, event.city, event.state, event.lat, event.long, event.source, event.source_id, event.image_thumb, event.image_medium]
  
  //INSERT CLIENT TO CLIENT TABLE
  return db.query(queryString, queryParameters)
  .then(function(eventId) {
    console.log('inserted event id is', eventId);
    return callback(eventId);
  })
  .catch(function(error){
    console.log('error inserting event to db, error is:', error);
    return callback(error, null);
  });

  module.exports.getOneEvent = function(eventId, callback){
		
}
