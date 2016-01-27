
var request = require('request')

module.exports = {
	getEvents: (latlng, callback) => {
	
    var eventfulKey = 'bkBjvhD7BjJDSJMC'
    //sample lat lng: 32.746682,-117.162741
    var url ='http://api.eventful.com/json/events/search/?'
    // var categories = 'c=music'
    var appkey = 'app_key=bkBjvhD7BjJDSJMC'
    var time = 't-this+week&end'
    var loc = 'where=' + latlng
    var range = 'within=.5'

    // var categories = ['music', 'comedy', 'conference', 'learning_education', 'family_fun_kids', 'festival_parades', 'movies_film', 'food', 'fundraisers', 'art', 'support', 'holiday', 'books', 'attractions', 'community', 'singles_social', 'schools_alumni', 'clubs_associations', 'outdoors_recreation', 'performing_arts', 'animals', 'sales', 'science', 'religion_spirituality', 'sports', 'technology'].join('')
    var categories = 

    // var reqUrl = `{url}&{categories}&{time}&{loc}&{range}&{appkey}`
    var reqUrl = url + '&t=' + time + '&' + loc + '&' + range + '&' + categories + '&' + appkey
    console.log('api call',reqUrl)

    request(reqUrl, function (error, response, body) {
      console.log('requesting...')
        if(error) {
          console.log(error)
          callback(error, null)
        }
        if (!error && response.statusCode == 200) {
          // console.log('body', body); 
          var results = JSON.parse(body).events.event
          var newresults = results.map(function(event){
            return {
              title: event.title
              description: event.description,
              start_time: event.start_time,
              stop_time: event.stop_time,
              category:
              address: event.venue_address
              city: event.city_name,
              state: event.region_name,
              lat: event.latitude,
              long: event.longitude,
              source: 'eventful',
              source_id: event.id,
              image_thumb: event.image.thumb.url,
              image_medium: event.image.medium.url
            }

          })
       

            callback(null, results)
        }
    });

	}
}


////////////
//api notes
////////////


  //example
  //var reqUrl = `http://api.eventful.com/json/events/search/?app_key=bkBjvhD7BjJDSJMC&t-this+week&end&where=32.746682,-117.162741&within=.5`

// call to individual event with event_id
  //http://api.eventful.com/json/events/get/?id=E0-001-090103636-9&app_key=bkBjvhD7BjJDSJMC

//date range
// Limit this list of results to a date range, specified by label or exact range. Currently supported labels include: "All", "Future", "Past", "Today", "Last Week", "This Week", "Next week", and months by name, e.g. "October". Exact ranges can be specified the form 'YYYYMMDD00-YYYYMMDD00', for example '2012042500-2012042700'; the last two digits of each date in this format are ignored. (optional)
