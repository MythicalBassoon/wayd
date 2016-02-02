const React = require('react-native')
const moment = require('moment')
const Email = require('../containers/Email')
const EventRect = require('../containers/EventRec')
const EventTabBar = require('./helpers/EventTabBar.js')

const MK = require('react-native-material-kit')
const {
  mdl,
  MKColor
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
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View
} = React

const EventRec = React.createClass({

  componentDidMount: function() {
    this.props.loadingscreen(true);
    this.submitToServer()
  },
  
  //submits date and time information for worker rendering
  submitToServer: function(){
    
    var url = `http://localhost:3000/api/events/${this.props.prevData.latlng}/${JSON.stringify(this.props.prevData.date)}`
    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
       this.props.getData(responseData)
       this.props.popEvent() 
    })
    .then(() => {
      this.props.loadingscreen(false)
    })
    .done();
    
  },

  no: function() {
    this.props.popEvent() 
  },

  yes: function() {
    console.log('yes')
    this.props.navigator.push({
      title: 'Add Friends',
      component: Email
    });
   
  },
 
  render: function() {
    console.log('event component render', this.props.apiresults)

    switch(this.props.loading){
      case true:
        return(
          <View style= {styles.spinnerContainer}>
              <SingleColorSpinner/>
          </View>
        )
      case false:

        console.log('api results', this.props)
        console.log('api current img', this.props.currentEvent)

        // var eventTime = moment(event.start_time).format('MMM Do YY')
        var event = this.props.currentEvent;

        return (
          <View style = {styles.mainContainer}>
            <View style={styles.body}>
              <Image style={styles.image} source={{uri: event.image_medium}}/>
              <Text style={styles.title}> {event.title} </Text>
              <Text style={styles.bodytext}> {event.address} </Text>
              <Text style={styles.bodytext}> { moment(event.start_time).calendar() } </Text>

              <TouchableHighlight
                style={styles.button}
                onPress={this.yes}
                underlayColor = "tranparent">
                <Text style={styles.buttonText}> yes </Text> 
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                onPress={this.no}
                underlayColor = "tranparent">
                <Text style={styles.buttonText}> no </Text> 
              </TouchableHighlight>
            </View>

            <EventTabBar/>
          </View>
        )
    }

  }

})


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#607D8B'
  },
  bodytext: {
    marginBottom: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#607D8B'
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
  image: {
    height: 150,
    width: 150,
    borderRadius: 65,
    marginTop: 50,
    alignSelf: 'center'
  },
  spinner: {
    color: 'blue',
    width: 50,
    height: 50,
    marginLeft: 150,
    marginRight: 150
  },
  spinnerContainer: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ECEFF1'
  },
  body:{
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30
  }

  

});

const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();


module.exports = EventRec
