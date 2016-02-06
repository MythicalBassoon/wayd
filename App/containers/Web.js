const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Web_View = require('../components/helpers/web');
const EventActions = require('../actions/eventRec')
const WebActions = EventActions

function mapStateToProps(state) {
  // console.log('state event rec container', state)
  return {
    currentEvent: state.eventrec.currentEvent
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WebActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Web_View)
 
