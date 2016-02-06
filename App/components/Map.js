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

var MapView = require('react-native-maps')
console.log(MapView)


//import MapView from 'react-native-maps';


var API_KEY_FACEBOOK_APP = require('../../apikeys').facebook_app_api_key;


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

  componentDidMount: function(){
    simpleAuthClient.configure('facebook', {
      app_id: API_KEY_FACEBOOK_APP
    }).then(() => {
      // Twitter is configured.
      console.log('facebook configured successfully')

    })

 
  },

  auth: function(){
    console.log(simpleAuthClient)

    simpleAuthClient.authorize('facebook').then((info) => {
  
  console.log('facebook data', info)

  var url = `http://104.236.40.104/api/users`;

  var obj = {  
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'user_id': info['id'],
    'user_first_name': info['first_name'],
    'user_last_name': info['last_name'],
    'user_email': info['email']
  })
}

   fetch(url, obj)
    .then((response) => response.json())
    .then((responseData) => {
      this.props.user_set(responseData[0]['id'], info['last_name'],info['first_name'], info['email']);
    

          this.props.navigator.push({
              title: 'Search',
              component: Search
            });
        }).catch((error) => {
          console.log('ERR', error)
          let errorCode = error.code;
          let errorDescription = error.description;
        });
    })
    
    .done();



 

//     simpleAuthClient.authorize('google-web').then((info) => {
//   console.log('google auth works', info)
// }).catch((error) => {
//   console.log('ERR', error)
//   let errorCode = error.code;
//   let errorDescription = error.description;
// });
  },

   onRegionChange: function(region){
    this.setState({ region: region });
  },

  //should navigate to search page depending on login status. might need to change this later to be
  //a call of {{this.login()}} should happen in render, making a check to redux state.
  login: function(){
    this.props.navigator.push({
      title: 'Search',
      component: Search
    });
  },

  render() {
    console.log('EVENT DETAILSSSSS', this.props.currentEvent)
  return (
    <MapView 
      style={styles.map}
       initialRegion={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
      region={this.state.region}
      onRegionChange={this.onRegionChange}
    >

    <MapView.Marker 
      coordinate={{latitude: this.state.latitude, longitude: this.state.longitude}}
      title='Current Position'
      pinColor='#81C784'
    />

    <MapView.Marker 
      coordinate={{latitude: this.props.currentEvent.lat, longitude: this.props.currentEvent.long}}
      title='Destination'
      description={this.props.currentEvent.title}
    >
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


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  map: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'black'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginBottom: 10,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  facebook: {
    backgroundColor: '#3b5998'
  },
  buttonText: {
    fontSize: 15,
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
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 22,
  },
});


const Textfield1 = MKTextField.textfield()
  .withPlaceholder('username...')
  .withStyle(styles.textfield)
  .build();

const Textfield2 = MKTextField.textfield()
  .withPlaceholder('password...')
  .withStyle(styles.textfield)
  .build();

// const FlatButton = MKButton.flatButton()
//   .withText('log in')
//   .build();
//

module.exports = Map
