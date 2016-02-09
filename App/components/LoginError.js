const React = require('react-native')
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


const LoginError = React.createClass({


  navigateHome: function(){

	  this.props.navigator.pop();
  },

  render: function() {

  	console.log("rendering login error page");

    return (
      <View style = {styles.mainContainer}>

        
        <Text style= {styles.title}> Looks like you are not logged into Facebook! </Text>
        <Text style= {styles.text}> Please login by navigating Home --> Settings --> Facebook and entering your username and password </Text>



        <TouchableHighlight
          style={styles.button}
          onPress={this.navigateHome}
          underlayColor="tranparent">
          <Text style={styles.buttonText}> Login </Text> 
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
   text: {
    marginBottom: 20,
    fontSize: 18,
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
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 22,
  },
});

module.exports = LoginError
