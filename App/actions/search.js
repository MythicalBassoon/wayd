
var search = exports = module.exports

// Actions dispatched from search page
exports.latlngadd = function latlngadd(lat, lng) {
  return {
    type: 'LATLNG',
    latlong: ''+lat+','+ lng
  }
}

//search time changed as datepickerios is scrolled through
exports.timechange = function timechange(date) {
  return {
    type: 'TIME_CHANGE',
    date: date
  }
}

//truthy statement to see if all parameters are valid from search page
exports.searchDisabled = function searchDisabled(bl) {
  return {
    type: 'SEARCH_DISABLED',
    searchDisabled: bl
  }
}

//loading screen after search is made
exports.loadingscreen = function loadingscreen(bool) {
  console.log('load screen action', bool)
  return {
    type: 'LOADING_SCREEN',
    loading: bool
  }
}

//data passed to eventview
exports.eventView = function eventView(data) {
  return {
    type: "PASS_SEARCH_QUERY",
    prevData: data
  }
}




