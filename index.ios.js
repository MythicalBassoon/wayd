/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
const React = require('react-native')
const { Provider } = require('react-redux')
const App = require('./App/containers/App')
const configureStore = require('./App/store/configureStore')

const {
  Component,
  AppRegistry
} = React

const store = configureStore()



class wayd extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}



AppRegistry.registerComponent('wayd', () => wayd);
