const React = require('react-native')
const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React


const Login = React.createClass({
  getInitialState: function() {
    return {
      newItem: '',
      numVotes: this.props.votes
    }
  },

  componentWillMount: function() {
    
  },

  increment: function(){
    this.props.add();
    this.setState({numVotes: this.props.votes})
    console.log(this.props.votes)
  },

 

  render: function() {

    console.log('Login page rerendered: ', this.props)


    return (
      <View style={styles.container}>
        <Text onClick={this.increment} style={styles.newItem}>Senor Sisig</Text>
        <TouchableHighlight style={styles.testContiner} onPress={this.increment}>
        <Text style={styles.newItem}>{this.props.votes}</Text>
        </TouchableHighlight>

        
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F6F6F6'
  },
  testContiner: {
    height: 40,
  },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
})

module.exports = Login
