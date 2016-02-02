const React = require('react-native')
const Search = require('../containers/Search')
let simpleAuthClient = require('react-native-simple-auth');

const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React

// simpleAuthClient.configure('facebook', {
//   app_id: '538359742991930'
// }).then(() => {
//   // Twitter is configured.
//   console.log('facebook configured successfully')

// })


const Login = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function(){
    simpleAuthClient.configure('facebook', {
      app_id: '538359742991930'
    }).then(() => {
      // Twitter is configured.
      console.log('facebook configured successfully')

    })

    //   simpleAuthClient.configure('google-web', {
    //   client_id: '777216675382-mhop0gopud73jbfockvij43n7uh15lpb.apps.googleusercontent.com',
    //   client_secret: 'wayd'
    // }).then(() => {
    //   // Twitter is configured.
    //   console.log('facebook configured successfully')

    // })
  },

  auth: function(){
    console.log(simpleAuthClient)

    simpleAuthClient.authorize('facebook').then((info) => {
  
  console.log('facebook data', info)

  var url = `http://localhost:3000/api/users`;

  var obj = {  
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'user_id': info['id'],
    'user_first_name': info['first_name'],
    'user_last_name': info['last_name'],
    'user_email': info['email']
  })
}

   fetch(url, obj)
    .then((response) => response.json())
    .then((responseData) => {
      this.props.user_set(responseData[0]['id'], info['last_name'],info['first_name'], info['email']);
    

          this.props.navigator.push({
              title: 'Search',
              component: Search
            });
        }).catch((error) => {
          console.log('ERR', error)
          let errorCode = error.code;
          let errorDescription = error.description;
        });
    })
    
    .done();



 

//     simpleAuthClient.authorize('google-web').then((info) => {
//   console.log('google auth works', info)
// }).catch((error) => {
//   console.log('ERR', error)
//   let errorCode = error.code;
//   let errorDescription = error.description;
// });
  },

  //should navigate to search page depending on login status. might need to change this later to be
  //a call of {{this.login()}} should happen in render, making a check to redux state.
  login: function(){
    this.props.navigator.push({
      title: 'Search',
      component: Search
    });
  },

  render: function() {


    return (
      <View style = {styles.mainContainer}>
        <Text style= {styles.title}> WAYD </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder="username"/>
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder="password"/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.login}
          underlayColor="tranparent">
          <Text style={styles.buttonText}> LOG IN </Text> 
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.facebook}
          onPress={this.auth}
          underlayColor="tranparent">
          <Text style={styles.buttonText}> FACEBOOK </Text> 
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
  searchInput: {
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
  facebook: {
    backgroundColor: '#3b5998'
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
});

module.exports = Login
