const React = require('react-native');
const Error = require('../components/Error');

const {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React

const Success = React.createClass({

  componentDidMount: function() {

  },

  navigateHome: function() {

    //navigate back to Search component. 
    //Note that redux state stays intact from previous search/poll creation!
    this.props.navigator.popN(3);

  },
  
  render: function() {
  	console.log('rendering success');
          return (
          	<View style = {styles.mainContainer}>
              <Text style={styles.title}>Thank you for setting up a poll! Your friends have now been sent emails. We will let you know when they have all voted.</Text>
              <TouchableHighlight
	              style={styles.button}
	              onPress = {this.navigateHome}
	              underlayColor = "tranparent">
              <Text style={styles.buttonText}>Back to Search</Text> 
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
    backgroundColor: '#B3B5B5'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  bodytext: {
    marginBottom: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#fff'
  },
  emailInput: {
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
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

module.exports = Success
