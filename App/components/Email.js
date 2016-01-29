const React = require('react-native')

const {
  StyleSheet,
  ListView,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View
} = React

const Email = React.createClass({

  componentDidMount: function() {
   console.log('email mounted...')
    
    // Animate creation
    // LayoutAnimation.spring();
    
  },
  
  render: function() {
    console.log('email component render..')

    return (
      <View style = {styles.mainContainer}>

        <Text style={styles.title}> Friend 1: </Text> 
        <TextInput
          style={styles.emailInput}
          value={this.props.email}
          placeholder="Enter Email"/>

        <Text style={styles.title}> Friend 2: </Text>
        <TextInput
          style={styles.emailInput}
          value={this.props.email}
          placeholder="Enter Email"/>

        <Text style={styles.title}> Friend 3: </Text>
        <TextInput
          style={styles.emailInput}
          value={this.props.email}
          placeholder="Enter Email"/>

        <TouchableHighlight
          style={styles.button}
          onPress={this.yes}
          underlayColor = "tranparent">
          <Text style={styles.buttonText}> SEND EMAIL </Text> 
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
