const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const EventRec = require('../components/EventRec')
const SearchActions = require('../actions/search')


function mapStateToProps(state) {
  console.log('state event rec container', state)
  return {
    latlng: null,
    date: null,
    loading: null,
    apiresults: null,
    prevData: state.eventrec.prevData
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EventRec)
 
