const React = require('react-native')
const moment = require('moment')
const Email = require('../containers/Email')

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
          <View style= {styles.mainContainer}>
             <ActivityIndicatorIOS
                animating ={this.props.loading}
                color = '#111'
                size = 'large'>
              </ActivityIndicatorIOS>
          </View>
        )
      case false:

        console.log('api results', this.props)
        console.log('api current img', this.props.currentimg)

        // var eventTime = moment(event.start_time).format('MMM Do YY')
        var event = this.props.currentimg;

        return (
          <View style = {styles.mainContainer}>

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
        )
    }

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
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

module.exports = EventRec
