const React = require('react-native');
const Search = require('../containers/Search');
const LoginError = require('./LoginError');
const simpleAuthClient = require('react-native-simple-auth');
const host = process.env.DEPLOYED ? 'http://104.236.40.104/' : 'http://localhost:3000/';
const {
  Icon
} = require('react-native-icons');
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
  TextInput,
  TouchableHighlight,
  View,
  Image,
  Modal,
  Animated,
  Dimensions
} = React
const API_KEY_FACEBOOK_APP = require('../../apikeys').facebook_app_api_key;

//LOGIN COMPONENT
const Login = React.createClass({
      componentDidMount: function() {
        simpleAuthClient.configure('facebook', {
          app_id: API_KEY_FACEBOOK_APP
        }).then(() => {
          //facebook auth is configured

        })
      },

      auth: function() {
        simpleAuthClient.authorize('facebook').then((info) => {
            var url = `${host}api/users`;
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
              .then((response) =>
                response.json()
              )
              .then((responseData) => {
                this.props.user_set(responseData[0]['id'], info['last_name'], info['first_name'], info['email']);

                this.props.navigator.push({
                  title: 'Search',
                  component: Search
                });
              }).catch((error) => {
                console.log('ERR', error)
                let errorCode = error.code;
                let errorDescription = error.description;
              });
          }).catch((error) => {
            console.log('outter error', error);
            this.props.navigator.push({
              title: 'LoginError',
              component: LoginError
            });
          })
          .done();
      },

      //should navigate to search page depending on login status. might need to change this later to be
      //a call of {{this.login()}} should happen in render, making a check to redux state.
      login: function() {
        this.props.navigator.push({
          title: 'Search',
          component: Search
        });
      },

      render: function() {
        return (
        <View style = {styles.mainContainer}>
          <View style={styles.imageContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/WAYDfinalGif.gif')}/>
          </View>
          <View style={styles.facebookContainer}>
          <TouchableHighlight
          style={styles.facebookLogin}
          onPress={() => {
              this.auth()
              console.log('login btn!');
            }}>
          <Image
            style={styles.facebookLogin}
            source={require('../assets/FacebookLogin.png')}/>
          </TouchableHighlight>
          </View>
         </View>
    )
  }
})

const styles = StyleSheet.create(require('../assets/styles.js'));


MK.setTheme({
  primaryColor: MKColor.Blue,
  accentColor: MKColor.Orange,
});

module.exports = Login
