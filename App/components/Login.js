const React = require('react-native')
const Search = require('../containers/Search')

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

  //should navigate to search page depending on login status. might need to change this later to be
  //a call of {{this.login()}} should happen in render, making a check to redux state.
  login: function(){
    this.props.navigator.push({
      title: 'Wayd',
      component: Search
    });
  },

  render: function() {


    return (
      <View style = {styles.mainContainer}>
        <Text style= {styles.title}> No New Friends. </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder="username"/>
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder="password"/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.login}
          underlayColor = "white">
          <Text style={styles.buttonText}> LOG IN </Text> 
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
});

module.exports = Login
