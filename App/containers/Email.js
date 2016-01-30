const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Email = require('../components/Email')
const EmailActions = require('../actions/email.js')



function mapStateToProps(state) {
  // console.log('state event rec container', state)
  return {
    emails: state.email.emails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EmailActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Email)
 
