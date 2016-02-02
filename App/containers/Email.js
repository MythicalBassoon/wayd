const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Email = require('../components/Email')
const EmailActions = require('../actions/email.js')



function mapStateToProps(state) {
  // console.log('state event rec container', state)
  return {
    emails: state.email.emails,
    currentEvent: state.eventrec.currentEvent,
    loading: state.email.loading,
    user_id: state.login.user_id,
    user_first_name: state.login.user_first_name,
    user_last_name: state.login.user_last_name

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EmailActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Email)
 
