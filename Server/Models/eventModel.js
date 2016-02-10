
var db = require('../../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../../DB/psql/index.js');


module.exports.insertEvent = function(eventObj, callback, database){
  db = database || db;

	//hardcoding below eventObj for test purposes only:

	// eventObj = {
 //   title: 'Gallery Chat: Dave Talbot on Secrecy and the CIA',
 //   description: 'Salon.com founder David Talbot has explored the relationship between power and secrecy throughout his career. He discusses his book The Devil’s Chessboard: Allen Dulles, the CIA, and the Rise of America’s Secret Government in conjunction with the exhibition Chasing Justice.\n\nKirkus Reviews called Dave Talbot’s The Devil&#39;s Chessboard: Allen Dulles, the CIA and the Rise of America&#39;s Secret Government, “a frightening biography of power, manipulation and outright treason,” encouraging “all engaged American citizens [to] read this book and have their eyes opened.” Talbot is also the author of the national bestseller, Season of the Witch, which was selected by the San Francisco Public Library for this year&#39;s One City, One Book campaign. He is also the author of the New York Times bestseller, Brothers: The Hidden History of the Kennedy Years. Talbot is the founder and former editor-in-chief of Salon, and has been hailed as “pioneer of web journalism” by the New York Times.',
 //   start_time: '2016-02-19 12:30:00',
 //   stop_time: '2016-02-19 13:00:00',
 //   category: null,
 //   address: '736 Mission Street',
 //   city: 'San Francisco',
 //   state: 'California',
 //   lat: 37.7859102,
 //   long: -122.403361,
 //   source: 'eventObjful',
 //   source_id: 'E0-001-089860428-8',
 //   image_thumb: 'http://s2.evcdn.com/images/thumb/I0-001/024/702/381-4.jpeg_/gallery-chat-dave-talbot-secrecy-and-cia-81.jpeg',
 //   image_medium: 'http://s2.evcdn.com/images/medium/I0-001/024/702/381-4.jpeg_/gallery-chat-dave-talbot-secrecy-and-cia-81.jpeg'
 // };
// callback = function(x) {console.log(x)};


  //array of values which will be inserted to clients table
  //These are expected to be properties on passed in eventObj obj
	var queryParameters = [eventObj.title, 
	eventObj.description, 
	eventObj.start_time, 
	eventObj.stop_time, 
	eventObj.category, 
	eventObj.address, 
	eventObj.city, 
	eventObj.state, 
	eventObj.lat, 
	eventObj.long, 
	eventObj.source, 
	eventObj.source_id, 
	eventObj.image_thumb, 
	eventObj.image_medium,
  eventObj.category_image]
  console.log('event model insert', queryParameters)
  //insert eventObj into eventObjs table
  return db.query(queryString.insertEvent, queryParameters)
  .then(function(eventObjId) {
    //console.log('inserted eventObj id is', eventObjId);
    return callback(null, eventObjId);
  })
  .catch(function(error){
    //console.log('error inserting eventObj to db, error is:', error);
    return callback(error, null);
  });
}

  //putting this here for future use if we build view component showing details for one eventObj

  module.exports.getOneEvent = function(eventId, callback, database){
  	db = database || db;
  	//hardcoding below paramter vales for testing purposes only!
    // callback = function(x) {console.log(x)};
    // eventId = 1;

    console.log('running getOneEvent');

    return db.query(queryString.getOneEvent, eventId)
      .then(function(event) {
        console.log('retrieved event is', event);
        return callback(null, event);
      })
      .catch(function(error){
        console.log('in getOneEvent, id is', eventId);
        console.log('error getting event, error is:', error);
        return callback(error, null);
      });
  },

  module.exports.geteventImage = function(eventId) {
    var eventHash ={
      'music' : 'http://mochadad.com/app/uploads/2012/12/sports.jpg',
      'comedy' : 'http://mochadad.com/app/uploads/2012/12/sports.jpg',
       'festival_parades' : 'http://mochadad.com/app/uploads/2012/12/sports.jpg',
       'movies_film': 'https://farm5.staticflickr.com/4054/4437783107_188a2649dd.jpg',
       'food' : 'https://farm6.staticflickr.com/5082/5346801287_ff59e548f8_b.jpg',
        'art': 'https://farm8.staticflickr.com/7184/6972527877_a36f6004b8_b.jpg',
        'attractions': 'https://m.flickr.com/photos/roijoy/17195074496/in/search?q=san%20francisco%20hiking&mt=all&w=all',
        'singles_social': 'http://mochadad.com/app/uploads/2012/12/sports.jpg',
       'outdoors_recreation': 'https://m.flickr.com/photos/gcquinn/2651368169/in/search?q=san%20francisco%20hiking&mt=all&w=all',
       'performing_arts': 'https://s.yimg.com/pw/images/spaceball.gif',
       'science': 'https://farm6.staticflickr.com/5180/5472406581_c05fba7d1a_b.jpg',
       'sports': 'http://mochadad.com/app/uploads/2012/12/sports.jpg',
       'technology':'https://farm8.staticflickr.com/7776/18067079332_285eac56b1_b.jpg',
       'default': 'https://m.flickr.com/photos/idashum/8503005246/in/search?q=san%20francisco%20outdoor%20concert&mt=all&w=all'
    }
    return eventHash[eventId] || 'http://mochadad.com/app/uploads/2012/12/sports.jpg'

  }

//module.exports.insertEventObj();	
//module.exports.getOneEvent();	



