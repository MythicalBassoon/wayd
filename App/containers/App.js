const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Login = require('../components/Login')
const ItemsActions = require('../actions/actions')

function mapStateToProps(state) {
	console.log('SEEING STATE', state)
  return {
    votes: state.voteZ.votes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ItemsActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login)
 