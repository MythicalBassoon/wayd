const React = require('react-native');
const MK = require('react-native-material-kit')
const Separator = require('./helpers/separator.js')
const Error = require('./Error')
const Success = require('./Success')
const Contacts = require('react-native-contacts')
const host = process.env.DEPLOYED ? 'http://104.236.40.104/' : 'http://localhost:3000/'
const { Icon } = require('react-native-icons');
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
        this.setState({
          contactsDataSource: this.state.contactsDataSource.cloneWithRowsAndSections(dataContacts, sectionIds, rowIds)
        })
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
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  },

  addEmail: function(contactEmail) {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    console.log('re', re);
    var currentEmail;
    if (this.state.email === ''){
      currentEmail = contactEmail;
    } else {
      currentEmail = this.state.email;
    }
    if (currentEmail && re.test(currentEmail) ) {
      console.log('email getting dispatched is...', currentEmail)
      this.props.addEmail(currentEmail);
      this.setState({
        email: ''
      })
    } else {
      console.log('invalid email')
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
    return (
        <View style={styles.section}>
            <Text style={styles.sectionHeaderText}>{sectionData}</Text>
        </View>
    );
  },

  renderContactRow: function (rowData) {
    return (
      <TouchableHighlight onPress={this.addFromContactRow.bind(this, rowData)}
        underlayColor = "#FFC107">
          <View style={styles.contactRow}>
              <Text style={styles.contactRowText}>{rowData.givenName} {rowData.familyName}</Text>        
          </View>
      </TouchableHighlight>
    );
  },

  addFromContactRow: function(rowData) {
    if (rowData.emailAddresses.length > 0){
      this.addEmail(rowData.emailAddresses[0].email);
      this.closeContactsView();
    }
  },

  deleteEmailRow: function(rowID) {
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
      onPress: this.deleteEmailRow.bind(this, rowID)
    }];
    return (
      <View>
        <Swipeout right={swipeBtns}
          autoClose='true'
          backgroundColor= 'transparent'>
            <Text style={styles.emailText}>{rowData}</Text>
        </Swipeout>
      </View>
    );
  },

  
  render: function() {
    switch (this.props.loading) {
      case false:
        return (
          <View style = {styles.mainEmailContainer}>
            <View style={styles.topSection}>
              <TouchableHighlight
                style={styles.smallButtonEmail}
                onPress = {this.contactsView}
                underlayColor = "#FFC107">
                <Icon
                  name='material|accounts-add'
                  size={30}
                  color='white'
                  style={styles.addFromContacts}/>
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
                style={styles.buttonEmail}
                onPress = {this.addEmail}
                underlayColor = "#FFC107">
                <Text style={styles.buttonTextEmail}> Add Email </Text> 
              </TouchableHighlight>
            </View>
            
            <View style={styles.middleSection}>
              <ListView
                dataSource={this.state.emailsDataSource.cloneWithRows(this.props.emails)}
                style={styles.listview}
                renderRow={this.renderEmailRow}
                renderSeparator={(sectionID, rowID) => <View key={`${rowID}`} style={styles.separator} />}
              />
            </View>
         
            <View style={styles.bottomSection}>
              <TouchableHighlight
                style={styles.buttonEmail}
                onPress = {this.sendPoll}
                underlayColor = "#FFC107">
                <Text style={styles.buttonTextEmail}>Send and vote!</Text> 
              </TouchableHighlight>
            </View>

            <View>
              <Modal
                animated={this.state.animated}
                transparent={this.state.transparent}
                visible={this.state.visible}>
                <View style={styles.modalContainerEmail}>
                  <ListView
                  dataSource={this.state.contactsDataSource}
                  style={styles.listview}
                  renderRow={this.renderContactRow}
                  renderSectionHeader = {this.renderContactSectionHeader}
                  renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}/>
                  
                  <TouchableHighlight
                    style={styles.buttonEmail}
                    onPress = {this.closeContactsView}
                    underlayColor = "#FFC107">
                    <Text style={styles.buttonTextEmail}>Close contacts</Text> 
                  </TouchableHighlight>
                </View>
              </Modal>
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
        console.log("error");
        return <Text style={styles.title}> Error... </Text>;
    }
  }
});

const styles = StyleSheet.create(require('../assets/styles.js'));

const SingleColorSpinner = mdl.Spinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build();

module.exports = Email
