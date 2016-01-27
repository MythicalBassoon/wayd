
var request = require('request')
var shuffle = require('./helpers').shuffle
var moment = require('moment')

//eventful api call
module.exports = {
	getEvents: (latlng, timeframe, callback) => {

    //create time section of query
	 // var timeframe = JSON.parse(timeframe);
   var tiempo = moment(timeframe).format('YYYYMMDD').toString()
   var time = `t=${tiempo}00-${tiempo}00`

    //construct api query
    var eventfulKey = 'bkBjvhD7BjJDSJMC'
    var url ='http://api.eventful.com/json/events/search/?'
    var appkey = 'app_key=bkBjvhD7BjJDSJMC'
    
    var loc = 'where=' + latlng
    var range = 'within=.5'
    var pageSize = 'page_size=2'

    var categories = 'c=' + ['music', 'comedy', 'conference', 'learning_education', 'family_fun_kids', 'festival_parades', 'movies_film', 'food', 'fundraisers', 'art', 'support', 'holiday', 'books', 'attractions', 'community', 'singles_social', 'schools_alumni', 'clubs_associations', 'outdoors_recreation', 'performing_arts', 'animals', 'sales', 'science', 'religion_spirituality', 'sports', 'technology'].join(',')

    // request string 
    var reqUrl = `${url}&${time}&${loc}&${range}&${categories}&${pageSize}&${appkey}`
    //var reqUrl = url + '&' + time + '&' + loc + '&' + range + '&' + categories + '&' + pageSize + '&' + appkey
    console.log('api call',reqUrl)

    request(reqUrl, function (error, response, body) {
      
      console.log('requesting...')

        if (!error && response.statusCode == 200) {

          //take resposne from eventful api and map it to data schema for db
          var results = JSON.parse(body).events.event
          console.log(body)
          console.log(results)

          var newresults = results.map(function(event){
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
              image_thumb: event.image !== null ? event.image.thumb.url : null ,
              image_medium: event.image !== null ? event.image.medium.url : null
            }

          });

          newresults = shuffle(newresults)
          console.log(newresults)

          callback(null, newresults)

        } else {
          callback(error, null)
        }
    });

	}
}


////////////
//api notes
////////////


//simple example
  //var reqUrl = `http://api.eventful.com/json/events/search/?app_key=bkBjvhD7BjJDSJMC&t-this+week&end&where=32.746682,-117.162741&within=.5`

// call to individual event with event_id
  //http://api.eventful.com/json/events/get/?id=E0-001-090103636-9&app_key=bkBjvhD7BjJDSJMC

//date or time range
  // The default is "Future", but many other human-readable time formats are supported, plus keywords like "Past", "This Weekend", "Friday", "Next month", and "Next 30 days".
var Today = new Date()
var Tomorrow = new Date(Today.getTime() + 1000 * 60 * 60 * 24)

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec']

var dateFormater = function(date) {
  return `t=${date.getFullYear().toString()}${months.toString()}+${date.getDate().toString()}`
}

var times = {
  today: dateFormater(Today),
  tomorrow: dateFormater(Tomorrow),
  weekend: 't=This+Weekend',
  week: 't=This+Week',
  date: 't=' ,
  future: 'date=future'

}

// '2016012600-2016012600'

  // dateformat:   http://eventful.com/events?q=music&l=San+Diego&t=9+December+2006

  // Limit this list of results to a date range, specified by label or exact range. Currently supported labels include: "All", "Future", "Past", "Today", "Last Week", "This Week", "Next week", and months by name, e.g. "October". Exact ranges can be specified the form 'YYYYMMDD00-YYYYMMDD00', for example '2012042500-2012042700'; the last two digits of each date in this format are ignored. (optional)
