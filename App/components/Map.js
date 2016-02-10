const React = require('react-native')
const Search = require('../containers/Search')
let simpleAuthClient = require('react-native-simple-auth');


const MK = require('react-native-material-kit')
const {
  MKButton,
  MKColor,
  mdl,
  MKTextField,
} = MK;

MK.setTheme({
  primaryColor: MKColor.Blue,
  accentColor: MKColor.Orange,
});

const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  TextInput,
  LinkingIOS,
  TouchableHighlight,
  View
} = React

const MapView = require('react-native-maps')
const API_KEY_FACEBOOK_APP = require('../../apikeys').facebook_app_api_key;


const Map = React.createClass({
getInitialState: function() {
    return {
      latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
    };
  },
  componentWillMount: function(){
    navigator.geolocation.getCurrentPosition(
                (initialPosition) => {this.setState({latitude: initialPosition.coords.latitude,longitude: initialPosition.coords.longitude});
                 console.log('GETTING CURRENT POSITION: ', initialPosition)}, // success callback
                (error) => console.log('ERROR CURRENT POSITION', error), // failure callback
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} // options
                );
  
  },




   onRegionChange: function(region){
    this.setState({ region: region });
  },



  render() {
  return (
    <MapView 
      style={styles.map}
       initialRegion={{
      latitude: this.props.currentEvent.lat,
      longitude: this.props.currentEvent.long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
      region={this.state.region}
      onRegionChange={this.onRegionChange}>

    <MapView.Marker 
      coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
      title='Current Position'
      pinColor='#81C784'/>

    <MapView.Marker 
      coordinate={{latitude: this.props.currentEvent.lat, longitude: this.props.currentEvent.long}}
      title='Destination'
      description={this.props.currentEvent.title}>
    <MapView.Callout>
    <Text> Destination: {this.props.currentEvent.title}</Text>
    <Text style={{color: 'blue'}}
      onPress={() => LinkingIOS.openURL('http://maps.google.com/maps?daddr='+this.props.currentEvent.lat+','+this.props.currentEvent.long+'&saddr='+this.state.latitude+','+this.state.longitude)}>
  See route on Google Maps App
</Text>

  </MapView.Callout>
    </MapView.Marker>
    </MapView>
  );
}
})


const styles = StyleSheet.create(require('../assets/styles.js'));


module.exports = Map
