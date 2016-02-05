const React = require('react-native')
const moment = require('moment')
const Email = require('../containers/Email')
const EventRect = require('../containers/EventRec')
const Map = require('./Map')

// const EventTabBar = require('./helpers/EventTabBar.js')
const Web_View = require('../containers/Web.js');

const MK = require('react-native-material-kit')
const host = !process.env.DEPLOYED ? 'http://104.236.40.104/' : 'http://localhost:3000/'
const {
    MKButton,
  MKColor,
  mdl,
  MKTextField,
  MKCardStyles,
  MKIconToggle
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

    var loc = this.props.prevData.latlng
    var timeframe = JSON.stringify(this.props.prevData.date)

    var url = `${host}api/events/?loc=${loc}&timeframe=${timeframe}`
    console.log('url', url)

    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
    //testing for client side filtering
      // console.log('res data time', responseData[0])
      // console.log('res data time2', new Date(responseData[0].start_time))
      // console.log('search date', new Date(this.props.prevData.date))
      // var resData = responseData.filter(function(event){
      //   if(event.start_time) 
      // })

       this.props.getData(responseData)
       this.props.popEvent() 
    })
    .then(() => {
      this.props.loadingscreen(false)
    })
    .done();
    
  },

  no: function() {
    if (this.props.apiresults.length === 0) {
      this.props.loadingscreen(true);
      this.submitToServer()
    } else {

      this.props.popEvent() 
    }
  },

   map: function() {
    this.props.navigator.push({
      title: 'Map',
      component: Map
    });
  },

  yes: function() {
    console.log('yes')
    this.props.navigator.push({
      title: 'Add Friends',
      component: Email
    });
   
  },

  //almost works; throws an error when navigate back...
  openPage: function(){
    var url = this.props.currentEvent.image_medium
    // console.log('page', url)

    this.props.navigator.push({
      title: 'Web View',
      component: Web_View,
      passProps: {url}
    });
  },
 
  render: function() {
    console.log('event component render', this.props)

    var action = (<Text> My action</Text>);
    var menu = (
       <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >

        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>more...</Text>


      </MKIconToggle>
    );
    //

    switch(this.props.loading){
      case true:
        return(
          <View style= {styles.spinnerContainer}>
              <Text style={styles.title}> Looking for cool things to do... </Text>
              <SingleColorSpinner/>
          </View>
        )
      case false:

        // console.log('api results', this.props)
        // console.log('api current img', this.props.currentEvent)

        var event = this.props.currentEvent;

        var url = `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.currentEvent.lat},${this.props.currentEvent.long}2&zoom=15&size=600x400&key=AIzaSyA4rAT0fdTZLNkJ5o0uaAwZ89vVPQpr_Kc`

        return (
          <View style = {styles.mainContainer}>
            

          <View style={MKCardStyles.card}>
            <Image source={{uri : url}} style={MKCardStyles.image}/>
            <Text style={MKCardStyles.title}>{event.title} </Text>
            <View  style={{ padding : 15 }} >
              <Text style={[MKCardStyles.content, {padding:0}]}>
                {event.address} 
              </Text>
                <Text style={[MKCardStyles.content, {padding:0}]}>
                {event.city}
              </Text>
              <Text style={[MKCardStyles.content, {padding:0}]}>
                { moment(event.start_time).calendar() } 
              </Text>
            </View>
            
            <View style={MKCardStyles.action}>
              <View style={MKCardStyles.menu}>{menu}</View>

              <TouchableHighlight
                style={styles.webBtn}
                onPress={this.openPage}
                underlayColor = "tranparent">
                <Text style={styles.title}> more info.. </Text> 
              </TouchableHighlight>

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


              <TouchableHighlight
                style={styles.button}
                onPress={this.map}
                underlayColor="tranparent">
                <Text style={styles.buttonText}> map </Text> 
              </TouchableHighlight>
            
            </View>
          </View>

            
          </View>
        )
    }

  }

})


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    marginTop: 50,
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
    marginLeft: 170,
    marginRight: 170
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
  },
   webBtn: {
    fontSize: 15,
    backgroundColor: 'white',
    alignSelf: 'center'
  },

  

});

const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();


module.exports = EventRec
