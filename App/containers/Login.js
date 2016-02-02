const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Login = require('../components/Login')
const LoginActions = require('../actions/login')

//currently no redux state variables given to login page. will need login status eventually
function mapStateToProps(state) {
  return {
  	user_id: state.login.user_id,
  	user_last_name: state.login.user_last_name,
  	user_first_name: state.login.user_first_name,
	user_email: state.login.user_email,
  }
}

//currently taking in search actions. will need new set of actions to set up user through server
function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login)
 