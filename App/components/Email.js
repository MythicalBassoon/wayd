const React = require('react-native');
const MK = require('react-native-material-kit')
const Separator = require('./helpers/separator.js')
const Error = require('./Error')
const Success = require('./Success')

const {
  StyleSheet,
  ListView,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
  ScrollView
} = React


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

const Email = React.createClass({

  componentDidMount: function() {
   console.log('email mounted...');
   this.setState({email: ''});

  },

  addEmail: function() {
    var email = this.state.email;
    console.log('email getting dispatched is...', email)
    this.props.addEmail(email);
  },


  sendPoll: function() {
    console.log("sending event:", this.props.currentEvent);
    this.props.loadingPoll(true);

    fetch('http://localhost:3000/api/polls', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pollInfo: {
          emails: this.props.emails,
          //Note tha the userId is hardcoded until Auth gets implemted!!
          user: {
            userId: 1,
            userFirstName: "Richard",
            userLastNAme: "Castro"
          },
        },
        eventInfo: this.props.currentEvent,
      })
    })
    .then(function(res) {
      console.log("Got a response!", res);
      this.props.loadingPoll(false);
      this.props.navigator.push({
      title: 'Success',
      component: Success
      });
    }.bind(this))
    .catch(function(err){
      this.props.loadingPoll(false)
      console.log("got an err!", err);
      this.props.navigator.push({
      title: 'Error',
      component: Error
      });
    })
  },
  
  render: function() {
    console.log('email component render..')
    console.log('props are', this.props);

    switch (this.props.loading) {
      case false:
        var emails = this.props.emails;
        var list = emails.map((email, index) => {
          return (
            <View>
              <Text key={index} style={styles.bodytext}>{email}</Text>
              <Separator/>
            </View>
            )
          });

        console.log(list);
        return (
          <View style = {styles.mainContainer}>

           <TextEmail onChangeText={(text) => this.setState({email:text})}/>

            <TouchableHighlight
              style={styles.button}
              onPress = {this.addEmail}
              underlayColor = "tranparent">
              <Text style={styles.buttonText}> Add Email </Text> 
            </TouchableHighlight>

            <ScrollView style={styles.container}>
              {list}
            </ScrollView>

            <TouchableHighlight
              style={styles.button}
              onPress = {this.sendPoll}
              underlayColor = "tranparent">
              <Text style={styles.buttonText}>Send to Friends!</Text> 
            </TouchableHighlight>
          </View>
          )

      case true:
      console.log('throwing up loading screen');
        return (
         <View style= {styles.mainContainer}>
             <ActivityIndicatorIOS
                animating ={this.props.loading}
                color = '#111'
                size = 'large'>
              </ActivityIndicatorIOS>
          </View>
          )

      default:
        console.log("in default for osme reason");
        return <View></View>;
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
    backgroundColor: 'white'
  },

  bodytext: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#607D8B'
  },

  buttonText: {
    fontSize: 15,
    color: '##607D8B',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#ECEFF1',
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

const TextEmail = MKTextField.textfield()
  .withPlaceholder('email...')
  .withStyle(styles.textfield)
  .build();



module.exports = Email
