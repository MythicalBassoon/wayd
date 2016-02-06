const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Map = require('../components/Map')
const EventActions = require('../actions/eventRec')


function mapStateToProps(state) {
  // console.log('state event rec container', state)
  return {
    loading: state.eventrec.loading,
    currentEvent: state.eventrec.currentEvent,
    apiresults: state.eventrec.apiresults,
    prevData: state.eventrec.prevData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EventActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Map)
 
