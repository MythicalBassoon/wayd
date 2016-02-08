const React = require('react-native')
const EventRec = require('../containers/EventRec')
const Moment = require('moment')
const SearchTabBar = require('./helpers/SearchTabBar.js')

 const MK = require('react-native-material-kit')
const {
  MKButton,
  MKColor,
  mdl,
  MKTextField,
  MKCardStyles
} = MK;

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
    //this.setState({DateRemoveError: true})

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

      

        <TouchableHighlight
          style={styles.button}
          onPress={this.eventRecView}
          underlayColor = "#FFC107">
          <Text style={styles.buttonText}> Find Me an Event! </Text> 
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.showModal}
          underlayColor = "#FFC107">
          <Text style={styles.buttonText}> When You Wanna Do Stuff? </Text> 
        </TouchableHighlight>


        {this.renderError()}


        <View>

          <Modal style={styles.modal}
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
                underlayColor = "FFC107">
                <Text style={styles.buttonText}> OK! </Text> 
              </TouchableHighlight>

            </View>

          </Modal>
        </View>

 
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
      backgroundColor: 'white'
    },

  buttonText: {
    fontSize: 15,
    paddingTop: 10,
    color: '#FFFFFF',
    fontFamily: 'HelveticaNeue-Medium',
    alignSelf: 'center'
  },
  button: {
    marginRight: 30,
    marginLeft: 30,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
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
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    opacity: .8
  }, 
  modal: {
    flexDirection: 'row',
  }
})

module.exports = Search
