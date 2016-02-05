const React = require('react-native')
const EventRec = require('../containers/EventRec')
const Moment = require('moment')
const SearchTabBar = require('./helpers/SearchTabBar.js')

 
const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  DatePickerIOS,
  ActivityIndicatorIOS,
  SliderIOS,
  View,
  TabBarIOS,
  Modal,
  Animated
} = React

// Node module import for Google API autocomplete (autocomplete only).
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var API_KEY_GOOGLE = require('../../apikeys').google_api_key;


const Search = React.createClass({
  getInitialState: function(){
    return {
      richard: 0,
    }
  },
  //changes redux.state.date
  onDateChange: function(date){
    // console.log('datechange', JSON.stringify(date))
    this.props.timechange(date);
  },

  eventRecView: function() {
    // console.log('eventrectview', this.props)
    console.log(this.props.searchButton, 'VALUE OF SEARCHBUTTON')
    if(this.props.searchButton){
      var message = {
      latlng: this.props.latlng,
      date: this.props.date
    }
    
    this.props.eventView(message)

    this.props.navigator.push({
      title: 'Event',
      component: EventRec
    });
    }
    else{
      this.setState({errorShow: true})

    }
    

  },

  componentWillMount: function(){
    navigator.geolocation.getCurrentPosition(
                (initialPosition) => {this.props.latlngadd(initialPosition.coords.latitude,initialPosition.coords.longitude); console.log('GETTING CURRENT POSITION: ', initialPosition)}, // success callback
                (error) => console.log('ERROR CURRENT POSITION', error), // failure callback
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
                );

  },

  componentDidMount: function() {
    // figure out for automatic geolocation findering without search
    // console.log('mounted...')
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log(position)
    // }, function(error) {
    //   console.log(error)
    // })
   console.log('search mounted...');

   

  },

  getInitialState: function() {
    return {
      value: 'today',
      animated: true,
      visible: false,
      transparent: true,
      errorShow: false

      // active: false
    }
  },

    renderError: function(){
     if(this.state.errorShow){
      console.log('renderError called')

      return(
           <Text style={styles.errortext}>Please choose a location or set it to Current location</Text>
           )
         }
   
  },

  wayd: function(text){
    if(text !== 'Current location'){
      this.props.searchDisabled(false);
      console.log('not curent location')
    }
    else{
      this.setState({errorShow: false})
      console.log('current location activated')
      this.props.searchDisabled(true);
      navigator.geolocation.getCurrentPosition(
                (initialPosition) => {this.props.latlngadd(initialPosition.coords.latitude,initialPosition.coords.longitude);
                 console.log('GETTING CURRENT POSITION: ', initialPosition)}, // success callback
                (error) => console.log('ERROR CURRENT POSITION', error), // failure callback
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
                );
      
    }
   

    

  },

  showDatePicker: function() {
    // console.log('show date picker', )
    // this.props.datePicker()


  },

  showModal: function(){
    this.setState({visible: true})
  },

  hideModal: function(){
    this.setState({visible: false})
  },


  render: function() {
    console.log('search props', this.props)

    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Where you at, homie?'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          onChangeText={this.functionTest}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details) => { // 'details' is provided when fetchDetails = true
          console.log('STUFF HAPPENING')
          this.setState({errorShow: false})
            var lat = details.geometry.location.lat;
            var lng = details.geometry.location.lng;
            this.props.searchDisabled(true)

            this.props.latlngadd(lat,lng);
            
          }}
          wayd = {this.wayd}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: API_KEY_GOOGLE,
            language: 'en', // language of the results
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            body: {flex: .8},
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              backgroundColor: 'white',
              height: 60,
              borderTopColor: 'white',
              borderBottomColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginTop: 10
            },
            textInput: {
              backgroundColor: 'rgba(125,125,125,0.1)',
              height: 55,
              borderRadius: 0,
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 6,
              paddingRight: 6,
              marginTop: 3,
              marginLeft: 8,
              marginRight: 8,
              fontSize: 15
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
            // types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}

        ></GooglePlacesAutocomplete>

        <Text style={styles.bodytext}> When you wanna do stuff? </Text>

        <TouchableHighlight
          style={styles.button}
          onPress={this.eventRecView}
          underlayColor = "#6495ed">
          <Text style={styles.buttonText}> find an event </Text> 
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.showModal}
          underlayColor = "tranparent">
          <Text style={styles.buttonText}> Display Timepicker </Text> 
        </TouchableHighlight>

        {this.renderError()}

        <View>
          <Modal
            animated={this.state.animated}
            transparent={this.state.transparent}
            visible={this.state.visible}>
            <View style={styles.datePickerContainer}>
              <DatePickerIOS
                style= {styles.datePicker}
                date={this.props.date}
                // timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
                mode="date" // changed from 'datetime'
                onDateChange={this.onDateChange}>
              </DatePickerIOS>
              <TouchableHighlight
                style={styles.button}
                onPress={this.hideModal}
                underlayColor = "tranparent">
                <Text style={styles.buttonText}> OK! </Text> 
              </TouchableHighlight>
            </View>
          </Modal>
        </View>

 
      </View>

    )
  }
})

Search.propTypes = {
  latlng: React.PropTypes.string.isRequired,
  date: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 40,
    backgroundColor: 'white',
    marginTop: 40,
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
    datePicker:{
      //flex: 1,
      //flexDirection: 'column',
      //alignItems:'flex-end',
      backgroundColor: 'white'
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
    fontSize: 15,
    paddingTop: 10,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#ECEFF1',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 0,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  footer: {
    flex: .2,
    backgroundColor: '#607D8B'
  },
  bodytext: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#607D8B'
  },
  errortext: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#C62828'
  },
  sliderView: {
    marginBottom: 10,
    flex: .5
  },
  datePickerContainer:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

module.exports = Search
