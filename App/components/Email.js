const React = require('react-native');
const MK = require('react-native-material-kit')
const Separator = require('./helpers/separator.js')
const Error = require('./Error')
const Success = require('./Success')
const Contacts = require('react-native-contacts')
const host = !process.env.DEPLOYED ? 'http://104.236.40.104/' : 'http://localhost:3000/'
var { Icon } = require('react-native-icons');
import Swipeout from 'react-native-swipeout'

const {
  StyleSheet,
  ListView,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
  ScrollView,
  Modal,
  AlertIOS,
} = React

const {
  MKButton,
  MKColor,
  mdl,
  MKTextField,
} = MK;

MK.setTheme({
  primaryColor: MKColor.Amber,
  accentColor: MKColor.Orange,
});

const Email = React.createClass({

  componentDidMount: function() { 
   this.setState({email: ''});

  },

  componentWillMount: function() {
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        console.log("No contacts")
      } else {
        this.props.addContacts(contacts);
        console.log(contacts);
           //var allContacts = this.props.contacts;
          var sectionIdIndex = {};
          var dataContacts = {};
          var sectionIds = [];
          var rowIds =[];
          for(var i=0; i<contacts.length; i++){
            if(contacts[i].emailAddresses.length > 0){
              var name = contacts[i].familyName || contacts[i].givenName
              if (sectionIds.indexOf(name.charAt(0)) < 0){
                sectionIds.push(name.charAt(0));
                rowIds[sectionIds.length - 1] = []
                dataContacts[name.charAt(0)] = name.charAt(0);
              }
              rowIds[sectionIds.indexOf(name.charAt(0))].push(contacts[i].recordID)
              dataContacts[name.charAt(0) + ':' + contacts[i].recordID] = contacts[i];
            }
          }
          console.log("DATA CONTACTS", dataContacts);
        console.log("DATTATTATA", this.state.dataSource)
        console.log("SECTIONIDS", sectionIds)
        console.log("SECTIONIDS", rowIds)

          this.setState({
            contactsDataSource: this.state.contactsDataSource.cloneWithRowsAndSections(dataContacts, sectionIds, rowIds)
          })
          console.log("DATA AFTER", this.state.dataSource)
      }
    });
  },

  getInitialState: function() {
    var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    }

    var getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID + ':' + rowID];
    }

    return {
      animated: true,
      visible: false,
      transparent: false,
      contactsDataSource: new ListView.DataSource({
        getSectionData          : getSectionData,
        getRowData              : getRowData,
        rowHasChanged           : (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2
      }),
      emailsDataSource: new ListView.DataSource({
        rowHasChanged           : (row1, row2) => row1 !== row2
      })
    }
  },

  addEmail: function() {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    console.log('re', re)
    var currentEmail = this.state.email

    if (currentEmail && re.test(currentEmail) ) {

    var email = this.state.email;
    console.log('email getting dispatched is...', email)
    this.props.addEmail(email);
    this.setState({
      email: ''
    })
    
    } else {
      console.log('invalid email')
      AlertIOS.alert(
        'Please enter a valid email'
        );
    }
     console.log("YAYYYYY", this.props.emails);
    this.setState({
      emailsDataSource: this.state.emailsDataSource.cloneWithRows(this.props.emails)
    })
  },

  addContactEmail: function(contactEmail){
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      console.log('re', re);
    var currentEmail = contactEmail;

    if (currentEmail && re.test(currentEmail) ) {
      var email = contactEmail;
      console.log('email getting dispatched is...', email)
      this.props.addEmail(email);
      this.setState({
      email: ''
      })
    } else {
      console.log('invalid email');
      AlertIOS.alert(
        'Please enter a valid email'
        );
    }
    this.setState({
      emailsDataSource: this.state.emailsDataSource.cloneWithRows(this.props.emails)
    })
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
            emails: this.props.emails.concat([this.props.user_email]),

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

  contactsView: function(){
    this.setState({visible: true});
  },

  closeContactsView: function(){
    this.setState({visible: false});
  },

  renderContactSectionHeader: function(sectionData, sectionID) {
    console.log("RENDERING SECTION ", sectionData, "WITH ID", sectionID)
    if (sectionData !== undefined){
      return (
          <View style={styles.section}>
              <Text style={styles.text}>{sectionData}</Text>
          </View>
      );
    } else {
      return (
        <View></View>
      );
    }
  },

  renderContactRow : function (rowData) {
    console.log("RENDERING ROW ", rowData)
    return (
        <TouchableHighlight onPress={this.rowContactFunction.bind(this, rowData)}
        underlayColor = "#FFC107">
            <View style={styles.contactRow}>
                <Text style={styles.contactRowText}>{rowData.givenName} {rowData.familyName}</Text>        
            </View>
        </TouchableHighlight>
    );
  },

  rowContactFunction: function(rowData) {
    if (rowData.emailAddresses.length > 0){
      this.addContactEmail(rowData.emailAddresses[0].email);
      this.closeContactsView();
    }
  },

  rowEmailDelete: function(rowID) {
    console.log("Deleting ROW ID", rowID);
    this.props.delEmail(rowID);
    this.setState({
      emailsDataSource: this.state.emailsDataSource.cloneWithRows(this.props.emails)
    });
  },

  renderEmailRow: function(rowData, sectionID, rowID) {
    var swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: this.rowEmailDelete.bind(this, rowID)
    }];
    console.log("RENDERING ROW EMAIL DATA ", rowData)
    return (
      <View style={styles.emailItem}>
      <Swipeout right={swipeBtns}
        autoClose='true'
        backgroundColor= 'transparent'>
            
                <Text style={styles.emailText}>{rowData}</Text>        
       
        </Swipeout>
        </View>
    );
  },

  
  render: function() {
    console.log('email component render.. props are', this)
    console.log('props are', this);

    var that = this;
    switch (this.props.loading) {
      
      case false:

        var emails = this.props.emails;
        console.log('email arr', emails);


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

                    <Icon key={index}
                      name='material|close-circle-o'
                      size={20}
                      color='#B6B6B6'
                      style={styles.close}
                    />
          


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
                style={styles.smallButton}
                onPress = {this.contactsView}
                underlayColor = "#FFC107">
                <Icon
                      name='material|accounts-add'
                      size={30}
                      color='white'
                      style={styles.addFromContacts}
                    />
              </TouchableHighlight>
              
            
              <View style={styles.textInputContainer}>
             <TextInput style={styles.textInput}
             onChangeText={(text) => this.setState({email:text})}
             value={this.state.email}
             keyboardType="email-address"
             clearButtonMode="while-editing"
             onSubmitEditing={this.addEmail}
             placeholder="Invite friends..."/>
             </View>

              <TouchableHighlight
                style={styles.button}
                onPress = {this.addEmail}
                underlayColor = "#FFC107">
                <Text style={styles.buttonText}> Add Email </Text> 
              </TouchableHighlight>
              </View>
              
              <View style={styles.middleSection}>
              <ListView
                dataSource={this.state.emailsDataSource}
                style={styles.listview}
                renderRow={this.renderEmailRow}
                renderSeparator={(sectionID, rowID) => <View key={`${rowID}`} style={styles.separator} />}
                />
                </View>
           
            <View style={styles.bottomSection}>
            <TouchableHighlight
                style={styles.button}
                onPress = {this.sendPoll}
                underlayColor = "#FFC107">
                <Text style={styles.buttonText}>Send and vote!</Text> 
              </TouchableHighlight>
            </View>
            <View>
            <Modal
            animated={this.state.animated}
            transparent={this.state.transparent}
            visible={this.state.visible}>
            <View style={styles.modalContainer}>
            
            <ListView
            dataSource={this.state.contactsDataSource}
            style={styles.listview}
            renderRow={this.renderContactRow}
            renderSectionHeader = {this.renderContactSectionHeader}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            />
              
              <TouchableHighlight
                style={styles.button}
                onPress = {this.closeContactsView}
                underlayColor = "#FFC107">
                <Text style={styles.buttonText}>Close contacts</Text> 
              </TouchableHighlight>
              </View>
            </Modal>
            </View>
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
    padding: 10,
    marginTop: 55,
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  Container: {
    flex: 1,
    padding: 0
  },
  addFromContacts: {
    flex: 1,
    borderRadius: 25
  },
  contactRow:{
    marginRight: 0,
    marginLeft: 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
  },
  contactRowText:{
    fontFamily: 'Bebas',
    fontSize: 15,
    paddingTop: 10,
    alignSelf: 'center'
  },
  letterText: {
    fontSize: 15,
    paddingTop: 10,
    color: 'black',
    fontFamily: 'Bebas',
    alignSelf: 'center'

  },
   smallButton: {
    marginTop: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
buttonText: {
    fontSize: 15,
    paddingTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Bebas',
    alignSelf: 'center'
  },
  listview: {
    flex: 1
  },
  button: {
    marginRight: 0,
    marginLeft: 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#673AB7',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 22,
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

  },
  emailText: {
    fontSize: 15,
    padding: 15,
    color: 'black',
    fontFamily: 'Bebas',
    alignSelf: 'center'
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

    flex: .35
  },
  middleSection: {

    flex: .5
  },
  bottomSection: {

    flex: .15

  },

  contacts: {

  },
  close: {
    height: 20,
    width: 20,
    flex: 1
  },
      rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderWidth: 1
    },
    rowText: {
        color: '#212121',
        fontSize: 16
    },
        text: {
        color: 'black',
        fontFamily: 'Bebas',
        paddingHorizontal: 8,
        fontSize: 16
    },
        section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#B6B6B6',
    },
    textInputContainer: {
              backgroundColor: 'white',
              height: 60,
              borderTopColor: 'black',
              borderBottomColor: 'black',
              borderLeftColor: 'black',
              borderRightColor: 'black',
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              marginTop: 10
            },
            textInput: {
              backgroundColor: 'rgba(125,125,125,0.1)',
              fontFamily: 'Bebas',
              textAlign: 'center',
              height: 55,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              fontSize: 15
            },
            separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
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
