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
  TouchableHighlight,
  View
} = React


const Login = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function(){
    simpleAuthClient.configure('facebook', {
      app_id: '538359742991930'
    }).then(() => {
      // Twitter is configured.
      console.log('facebook configured successfully')

    })
  },

  auth: function(){
    console.log(simpleAuthClient)

    simpleAuthClient.authorize('facebook').then((info) => {
  console.log('facebook auth works', info)
}).catch((error) => {
  console.log('ERR', error)
  let errorCode = error.code;
  let errorDescription = error.description;
});
  },

  //should navigate to search page depending on login status. might need to change this later to be
  //a call of {{this.login()}} should happen in render, making a check to redux state.
  login: function(){
    this.props.navigator.push({
      title: 'Search',
      component: Search
    });
  },

  render: function() {

    return (
      <View style = {styles.mainContainer}>

        
        <Text style= {styles.title}> WAYD </Text>

        <Textfield1 value={this.state.username}/>

        <Textfield2 value={this.state.username}/>


        <TouchableHighlight
          style={styles.facebook}
          onPress={this.auth}
          underlayColor="tranparent">
          <Text style={styles.buttonText}> FACEBOOK </Text> 
        </TouchableHighlight>


      </View>
    )
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

module.exports = Login
