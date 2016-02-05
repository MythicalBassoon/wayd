const React = require('react-native');
const MK = require('react-native-material-kit')
const Separator = require('./helpers/separator.js')
const Error = require('./Error')
const Success = require('./Success')

const host = !process.env.DEPLOYED ? 'http://104.236.40.104/' : 'http://localhost:3000/'

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
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    console.log('re', re)
    var currentEmail = this.state.email

    if (currentEmail && re.test(currentEmail) ) {

    var email = this.state.email;
    console.log('email getting dispatched is...', email)
    this.props.addEmail(email);
    
    } else {
      console.log('invalid email')
    }
  },



  sendPoll: function() {
    if (this.props.emails.length) {

      console.log("sending event:", this.props.currentEvent);
      this.props.loadingPoll(true);

      fetch(host + 'api/polls', {
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
              userId: this.props.user_id,
              userFirstName: this.props.user_first_name,
              userLastName: this.props.user_last_name
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

    }

  },
  
  render: function() {
    console.log('email component render.. props are', this)
    console.log('props are', this);

    var that = this;
    switch (this.props.loading) {
      
      case false:
        var emails = this.props.emails;
        console.log('email arr', emails)
        var list = emails.map(function(email, index) {
          return (
            <View style={styles.btnContainer} key={index} >
                
                <View  style={styles.emailItem}>

                  <Text style={styles.bodytext}>{email}</Text>

                  <TouchableHighlight key={index} 
                    style={styles.delBtn}

                    onPress = {function() {
                      var child = this.children.props.children
                      console.log('delete email',this.children.key)
                      that.props.delEmail(this.children.key)
                    }}

                    underlayColor = "tranparent">
                    <Text key={index}style={styles.fakeBtn}></Text>
                  </TouchableHighlight>
      
                </View>
              <Separator/>
              </View>
            )
          });

      
        return (
          <View style={styles.Container}>
            <View style = {styles.mainContainer}>
              <View style={styles.topSection}>

               <TouchableHighlight
                style={styles.button}
                onPress = {this.sendPoll}
                underlayColor = "tranparent">
                <Text style={styles.buttonText}>Send to Friends!</Text> 
              </TouchableHighlight>
            

             <TextEmail 
             onChangeText={(text) => this.setState({email:text})}/>

              <TouchableHighlight
                style={styles.button}
                onPress = {this.addEmail}
                underlayColor = "tranparent">
                <Text style={styles.buttonText}> Add Email </Text> 
              </TouchableHighlight>

            </View>

              <ScrollView style={styles.bottomSection}  
              onScroll={() => { console.log('onScroll!'); }}>
                {list.length > 0 ? list : <View></View>}
              </ScrollView>

           
            </View>
          </View>
          )

      case true:
        console.log('throwing up loading screen');
        return (
          <View style= {styles.spinnerContainer}>
              <Text style={styles.title}> Sending emails... </Text>
              <SingleColorSpinner/>
          </View>
          )

      default:
        console.log("oops");
        return <Text style={styles.title}> Error... </Text>;
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
  Container: {
    flex: 1,
    padding: 0
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
  delBtn: {
    height: 30,
    width: 15,  
    backgroundColor: '#ECEFF1',
    flex: .1

  },
  bodytext: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#607D8B',
    flex: .8
  },
  emailItem: {
    flexDirection: 'row',
  },
  btnContainer: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  fakeBtn: {
    backgroundColor: '#ECEFF1',
    color: 'white',
    height: 40
  },
  topSection: {
    flex: .3
  },
  bottomSection: {
    flex: .7
  }

  
});

const TextEmail = MKTextField.textfield()
  .withPlaceholder('email...')
  .withStyle(styles.textfield)
  .build();

const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();


module.exports = Email
