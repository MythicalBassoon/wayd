const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Login = require('../components/Login')
const ItemsActions = require('../actions/search')

//currently no redux state variables given to login page. will need login status eventually
function mapStateToProps(state) {
  return {
  }
}

//currently taking in search actions. will need new set of actions to set up user through server
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ItemsActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login)
 