const React = require('react-native')
// add next view to navigated to for email form, or add component here?

const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View
} = React

const EventRec = React.createClass({

  componentDidMount: function() {

    this.submitToServer()
  },
  
  //submits date and time information for worker rendering
  submitToServer: function(){
    console.log('submit to server', this.props)
    this.props.loadingscreen(true);

    
  //curl http://localhost:3000/api/events/37.7841,-122.40903/2016-01-28T20:10:20.232Z

    fetch("http://localhost:3000/api/events/37.7841,-122.40903/2016-01-28T20:10:20.232Z", {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
        
        console.log('res data', responseData)
        this.props.getData(responseData)
        this.props.loadingscreen(false)
        
        console.log('props...', this.props)

        
    })
    .done();
    
  },

  emailView: function(){

  },

  render: function() {
    console.log('event component', this.props)
    return (
      <View style = {styles.mainContainer}>
        <Text style= {styles.title}> event </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={this.login}
          underlayColor = "white">
          <Text style={styles.buttonText}> yes </Text> 
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

module.exports = EventRec
