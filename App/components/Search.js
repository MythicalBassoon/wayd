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
  Animated, 
  AlertIOS
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
      errorShow: false,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60

      // active: false
    }
  },
  //changes redux.state.date
  onDateChange: function(date){
    // console.log('datechange', JSON.stringify(date))
    this.props.timechange(date);
    this.setState({date: date});
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
    this.props.searchDisabled(false);

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

        AlertIOS.alert(
        'Please choose a location or set it to Current location'
        );
      }
   
  },

  wayd: function(text){
    this.setState({errorShow: false})
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
    console.log('search props', this.state.date)

    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder=' Where you at, homie?'
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
              borderTopColor: 'black',
              borderBottomColor: 'black',
              borderLeftColor: 'black',
              borderRightColor: 'black',
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              marginTop: 10
            },
            textInput: {
              backgroundColor: 'rgba(125,125,125,0.1)',
              fontFamily: 'Bebas',
              height: 55,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
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
          style={styles.bigButton}
          onPress={this.eventRecView}
          underlayColor = "#FFC107">
          <Text style={styles.buttonText}> FIND ME AN EVENT! </Text> 
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.smallButton}
          onPress={this.showModal}
          underlayColor = "#FFC107">
          <Text style={styles.smallButtonText}> Not Today? </Text> 
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
                date={this.state.date}
                // timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
                mode="date" // changed from 'datetime'
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}>
              </DatePickerIOS>

              <TouchableHighlight
                style={styles.button}
                onPress={this.hideModal}
                underlayColor = "FFC107">
                <Text style={styles.smallButtonText}> OK! </Text> 
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
    flex: 1,
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
      backgroundColor: '#b6b6b6'
    },

  buttonText: {
    fontSize: 45,
    paddingTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    textAlign: 'center',
    alignSelf: 'center'
  },
   smallButtonText: {
    fontSize: 12,
    paddingTop: 0,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    textAlign: 'center',
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
   bigButton: {
    marginRight: 30,
    marginLeft: 30,
    height: 260,
    width: 260,
    borderRadius: 130,
    flexDirection: 'column',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
   smallButton: {
    marginRight: 30,
    marginLeft: 30,
    height: 100,
    width: 100,
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'flex-end',
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
