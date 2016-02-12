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
              <Text style={styles.title}> Thanks for setting up a poll! </Text>
              <Text style={styles.bodyText}> The emails are out. We'll let you know when the votes are in.</Text>
              <TouchableHighlight
	              style={styles.button}
	              onPress = {this.navigateHome}
	              underlayColor = "#FFC107">
              <Text style={styles.buttonText}>Back to Search</Text> 
              </TouchableHighlight>
            </View>
            )
      	}

})



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontFamily: 'Raleway-Light',
    textAlign: 'center',
    color: 'black'
  },
   bodyText: {
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Raleway-Light',
    textAlign: 'center',
    color: 'black'
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});

module.exports = Success
