const React = require('react-native');

const {
  Text,
  View,
  Image,
  StyleSheet
} = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Event extends React.Component{

  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.props.apiresults[0].image_medium}}/>
        <Text style={styles.name}> {this.props.apiresults[0].title} </Text>
        <Text style={styles.handle}> {this.props.apiresults[0].address} </Text>

            
      </View>
    )
  }
};


module.exports = Event;
