const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const Search = require('../components/Search')
const SearchActions = require('../actions/search')



function mapStateToProps(state) {
  return {
    latlng: state.search.latlng, //lat long received from google autocomplete
    date: state.search.date, // date OBJECT!!!! not a string. object will have methods like .getDate()
    loading: state.search.loading //boolean value to show whether server is still handling event request
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Search)
 