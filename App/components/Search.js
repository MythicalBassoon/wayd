const React = require('react-native')
const EventRec = require('../containers/EventRec')



const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  TextInput,
  TouchableHighlight,
  DatePickerIOS,
  ActivityIndicatorIOS,
  View
} = React

// Node module import for Google API autocomplete (autocomplete only).
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');


const Search = React.createClass({
  //changes redux.state.date
  onDateChange: function(date){
    console.log('datechange', date)
    this.props.timechange(date);
  },

  //submits date and time information for worker rendering
    // submitToServer: function(){
    //   console.log(this.props)
    //   this.props.loadingscreen(true);

      /*
      // fetch("http://api.eventful.com/json/events/search/?app_key=bkBjvhD7BjJDSJMC&t-this+week&end&where=32.746682,-117.162741&within=.5", {method: "GET"})
      // .then((response) => response.json())
      // .then((responseData) => {
          
      //     console.log('res data', responseData.events.event)
      //     //
      //     this.props.loadingscreen(false)

      //     console.log('props...', this.props)

      //     //dispatch action
      //     this.props.getData(responseData.events.event)

      //     this.props.navigator.push({
      //       component: View,
      //       }
      //     });

      // })
      // .done();
      */
    // },
  eventRecView: function() {
    console.log('eventrectview', this.props)
    var message = {
      latlng: this.props.latlng,
      date: this.props.date
    }
    
    this.props.eventView(message)

    this.props.navigator.push({
      component: EventRec
    });

  },

  componentDidMount: function() {
    // this.eventview
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log(position)
    // }, function(error) {
    //   console.log(error)
    // })
  },

  render: function() {

    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='city, please!'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details) => { // 'details' is provided when fetchDetails = true
            var lat = details.geometry.location.lat;
            var lng = details.geometry.location.lng;
            this.props.latlngadd(lat,lng);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCNsbBETvV4YWKJED_pBZ_9UKJVwYXcHSs',
            language: 'en', // language of the results
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              backgroundColor: 'white',
              height: 44,
              borderTopColor: 'white',
              borderBottomColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              backgroundColor: 'rgba(125,125,125,0.1)',
              height: 33,
              borderRadius: 7,
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 6,
              paddingRight: 6,
              marginTop: 3,
              marginLeft: 8,
              marginRight: 8,
              fontSize: 15,
            },
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}

        ></GooglePlacesAutocomplete>

       
        <DatePickerIOS
          date={this.props.date}
          timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
          mode="datetime"
          onDateChange={this.onDateChange}>
        </DatePickerIOS>

        <TouchableHighlight
          style={styles.button}
          onPress={this.eventRecView}
          underlayColor = "white">
          <Text style={styles.buttonText}> FIND ME AN EVENT </Text> 
        </TouchableHighlight>


        <ActivityIndicatorIOS
          animating ={this.props.loading}
          color = '#111'
          size = 'large'>
        </ActivityIndicatorIOS>
      </View>
    )
  }
})

// Search.propTypes = {
//   latlng: React.PropTypes.string.isRequired,
//   date: React.PropTypes.object.isRequired
// }

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 40,
    backgroundColor: '#F6F6F6'
  },
  testContiner: {
    height: 40,
  },
  textInput: {
      backgroundColor: 'rgba(125,125,125,0.1)',
      height: 33,
      borderRadius: 7,
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 6,
      paddingRight: 6,
      marginTop: 3,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 15,
    },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'purple',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
})

module.exports = Search
