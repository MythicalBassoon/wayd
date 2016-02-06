
var request = require('request')
var shuffle = require('./helpers').shuffle
var dateFormater = require('./helpers.js').dateFormater
var eventfulKey = require('./apikeys').eventfulKey
var appkey = require('./apikeys').appkey

/************************************************************/
// EVENTFUL API QUERY
/************************************************************/

module.exports = {
	getEvents: (latlng, timeframe, callback) => {
    //construct api query

      //create time section of query: using moment library
        // var moment = require('moment')
        // var t = JSON.stringify(new Date()) ;
        // var today = moment(t).format('YYYYMMDD').toString()
        // var eventDate = moment(timeframe).format('YYYYMMDD').toString()

    //using non-moment formatting
    // var today = dateFormater(new Date())
    // console.log('today', today)
    var eventDate = dateFormater(timeframe)
    console.log('date for api', eventDate)
    var time = `t=${eventDate}-${eventDate}` // look between now and the date given
    var url ='http://api.eventful.com/json/events/search/?'
    
    if(latlng.split(",").length !== 2){
      latlng = '0,0'
    }
    var loc = 'where=' + latlng
    var range = 'within=.5'
    var pageSize = 'page_size=30'

    var categories = 'c=' + ['music', 'comedy', 'conference', 'learning_education', 'family_fun_kids', 'festival_parades', 'movies_film', 'food', 'fundraisers', 'art', 'support', 'holiday', 'books', 'attractions', 'community', 'singles_social', 'schools_alumni', 'clubs_associations', 'outdoors_recreation', 'performing_arts', 'animals', 'sales', 'science', 'religion_spirituality', 'sports', 'technology'].join(',')

    // request string 
    var reqUrl = `${url}&${time}&${loc}&${range}&${categories}&${pageSize}&${appkey}`

    request(reqUrl, function (error, response, body) {

        if (!error && response.statusCode == 200) {

          //take resposne from eventful api and map it to data schema for db
          //Richard: handles if there's no events in area or bad time
          // console.log('body', body)
          if(JSON.parse(body).events){

            var results = JSON.parse(body).events.event
          }
          else{
            results = [];
          }
          
          

          var newresults = results.filter(function(event){
            // console.log('time', eventDate, dateFormater(JSON.stringify(new Date(event.start_time))))
            if (eventDate === dateFormater(JSON.stringify(new Date(event.start_time)))){
              return event
            }

          }).map(function(event){

            return {
              title: event.title,
              description: event.description,
              start_time: event.start_time,
              stop_time: event.stop_time,
              category: null,
              address: event.venue_address,
              city: event.city_name,
              state: event.region_name,
              lat: event.latitude,
              long: event.longitude,
              source: 'eventful',
              source_id: event.id,
              image_thumb: event.venue_url !== null ? event.venue_url : null ,
              image_medium: event.image !== null ? event.image.medium.url : null
            }

          })

          newresults = shuffle(newresults)
          // console.log(newresults)

          callback(null, newresults)

        } else {
          callback(error, null)
        }
    });

	}
}


/************************************************************/
// EVENTFUL NOTES
/************************************************************/


//simple example
  //var reqUrl = `http://api.eventful.com/json/events/search/?app_key=bkBjvhD7BjJDSJMC&t-this+week&end&where=32.746682,-117.162741&within=.5`

// call to individual event with event_id
  //http://api.eventful.com/json/events/get/?id=E0-001-090103636-9&app_key=bkBjvhD7BjJDSJMC


// DATE AND TIME:
  // The default is "Future", but many other human-readable time formats are supported, plus keywords like "Past", "This Weekend", "Friday", "Next month", and "Next 30 days".

  
  // var Tomorrow = new Date(Today.getTime() + 1000 * 60 * 60 * 24) //not used yet

  // timeframe hash for extending user controls of timeframe
  var times = {
    today: '',
    tomorrow: '',
    weekend: 't=This+Weekend',
    week: 't=This+Week',
    future: 'date=future'
  }


  // Limit this list of results to a date range, specified by label or exact range. Currently supported labels include: "All", "Future", "Past", "Today", "Last Week", "This Week", "Next week", and months by name, e.g. "October". Exact ranges can be specified the form 'YYYYMMDD00-YYYYMMDD00', for example '2012042500-2012042700'; the last two digits of each date in this format are ignored. (optional)

  // another dateformat:   http://eventful.com/events?q=music&l=San+Diego&t=9+December+2006
