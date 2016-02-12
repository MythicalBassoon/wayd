
const React = require('react-native')
const moment = require('moment')
const Email = require('../containers/Email')
const EventRect = require('../containers/EventRec')
const Map = require('../containers/Map')

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
  primaryColor: MKColor.Amber,
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
      submitToServer: function() {

        var loc = this.props.prevData.latlng
        var timeframe = JSON.stringify(this.props.prevData.date)

        var url = `${host}api/events/?loc=${loc}&timeframe=${timeframe}`
        console.log('url', url)

        fetch(url, {
            method: "GET"
          })
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
        if (this.props.apiresults.length === 0) {
          this.props.loadingscreen(true);
          this.submitToServer()
        } else {

          this.props.popEvent()
        }
      },

      map: function() {
        var event = this.props.currentEvent;
        this.props.navigator.push({
          title: 'Map',
          component: Map
        });
      },

      yes: function() {
        this.props.navigator.push({
          title: 'Add Friends',
          component: Email
        });

      },

      //almost works; throws an error when navigate back...
      openPage: function() {
        var url = this.props.currentEvent.image_thumb
        this.props.navigator.push({
          title: 'Web View',
          component: Web_View,
          passProps: {
            url
          }
        });
      },

      render: function() {
        var menu = (
          <View style={styles.detailsOutline}>
           <MKIconToggle
            checked={true}
            onCheckedChange={this._onIconChecked}
            onPress={() =>{
              console.log('toggle')
              this.openPage()
              this._onIconClicked
            }}
            >
            <Text pointerEvents="none"
                  style={styles.toggleText}>details</Text>
            <Text state_checked={true}
                  pointerEvents="none"
                  style={[styles.toggleText, styles.toggleText]}>details</Text>
          </MKIconToggle>
          </View>
        );
        //CHECKS REDUX STATE to show loading screen or actual eventRec page
        switch(this.props.loading){
          case true:
            var loadingArray = ['Looking for cool things to do...', 'Finding the dopest event ever...', 'Finding the highest levels of turn up...', 'You\'re about to be shown a sick event... like fun sick...', 'We\'re pretty sure Brad Pitt will be at these events...', 'Wait up, Homie...', 'I think we found your event soulmate...', 'Using super baller, fun-maximizing algorithm...'];
            var item = loadingArray[Math.floor(Math.random()*loadingArray.length)]
            return(
              <View style= {styles.spinnerContainer}>
                  <Text style={styles.loadingTitleEventRec}> {item}</Text>
                  <SingleColorSpinner/>
              </View>
            )
          case false:
          //substrings title to 48 characters to fit on page
            if (this.props.currentEvent) {
              var event = this.props.currentEvent;
              if(event.title.length > 48){
                event.title = event.title.substring(0,48) + '...'
              }
              var url = `https://maps.googleapis.com/maps/api/staticmap?markers=size:small%7Ccolor:red%7C${this.props.currentEvent.lat},${this.props.currentEvent.long}2&zoom=15&size=640x400&key=AIzaSyA4rAT0fdTZLNkJ5o0uaAwZ89vVPQpr_Kc`
              return (
                <View style = {styles.mainContainerEventRec}>                      
                  <View style={MKCardStyles.card}>
                    <View style={styles.eventTitleView}>
                      <Text style={[styles.eventTitle]}>{event.title} </Text>
                    </View>
                    <View style={styles.eventMapView}>
                      <TouchableHighlight
                        style={[MKCardStyles.image, { opacity: .8}]}
                        onPress={this.map}
                        underlayColor="#FFC107">                       
                        <Image source={{uri : url}}  style={MKCardStyles.image}/>                       
                      </TouchableHighlight>
                    </View>
                      <View  style={{ padding : 15 }} >
                        <Text style={[MKCardStyles.content, styles.textInfo]}>
                          {event.address} 
                        </Text>
                          <Text style={[MKCardStyles.content, styles.textInfo]}>
                          {event.city}
                        </Text>
                        <Text style={[MKCardStyles.content, styles.textInfo]}>
                          { moment(event.start_time).calendar() } 
                        </Text>
                        <View style={MKCardStyles.menu}>{menu}</View>
                      </View>
                      <View style={MKCardStyles.action}>
                        <TouchableHighlight
                          style={styles.webBtn}>
                          <Text style={styles.titleEventRec}>  </Text> 
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={styles.buttonEventRec}
                          onPress={this.yes}
                          underlayColor='#FFC107'>
                          <Text style={styles.buttonTextEventRec}> YES!    Lets    send    Invites! </Text> 
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={styles.buttonEventRec}
                          onPress={this.no}
                          underlayColor='#FFC107'>
                          <Text style={styles.buttonTextEventRec}> No    Thanks,    Next    Event </Text> 
                        </TouchableHighlight>
                      </View>
                    </View>     
                  </View>
              )
            }
            else {
              return (
                 <View style= {styles.mainContainer}>
                  <Text style={styles.titleEventRec}>There are no events in the area! Try searching from a different spot.</Text>
                </View>
                )
            }
        }
      }
})


const styles = StyleSheet.create(require('../assets/styles.js'));

const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();


module.exports = EventRec
