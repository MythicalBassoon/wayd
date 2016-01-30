const React = require('react-native');

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

const Email = React.createClass({

  componentDidMount: function() {
   console.log('email mounted...');
   this.setState({email: ''});
    
    // Animate creation
    // LayoutAnimation.spring();
    
  },

  addEmail: function() {
    var email = this.state.email;
    console.log('email getting dispatched is...', email)
    this.props.addEmail(email);
  },


  sendPoll: function() {
    console.log("sending event:", this.props.currentEvent);
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
    })
    .catch(function(err){
      console.log("got an err!", err);
    })
  },
  
  render: function() {
    console.log('email component render..')
    console.log('props are', this.props);

    var emails = this.props.emails;
    var list = emails.map((email, index) => {
      return (
          <Text style={styles.bodytext}>{email}</Text>
        )
      });

    console.log(list);


    return (
      <View style = {styles.mainContainer}>

        <TextInput
          style={styles.emailInput}
          defaultValue= ''
          onChangeText={(text) => this.setState({email:text})}
          placeholder="Enter Email"/>

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

module.exports = Email
