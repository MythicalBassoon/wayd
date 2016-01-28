/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
const React = require('react-native')
const { Provider } = require('react-redux')
//const App = require('./App/containers/Search')
const configureStore = require('./App/store/configureStore')
const Login = require('./App/containers/Login')

const {
  Component,
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React

const store = configureStore()

class wayd extends React.Component{
  render() {
    return (
      <Provider store={store}>
          <NavigatorIOS
            style={styles.container}
            initialRoute = {{
              title: "wayd",
              component: Login
            }}
            navigationBarHidden = {true}
          />
      </Provider>
    );
  }
};

var styles = StyleSheet.create({
  container:{
    flex: 1
  },
})

AppRegistry.registerComponent('wayd', () => wayd);
