
var search = exports = module.exports

// Actions dispatched from search page
exports.latlngadd = function latlngadd(lat, lng) {
  return {
    type: 'LATLNG',
    latlong: ''+lat+','+ lng
  }
}

exports.timechange = function timechange(date) {
  return {
    type: 'TIME_CHANGE',
    date: date
  }
}
exports.searchDisabled = function searchDisabled(bl) {
  return {
    type: 'SEARCH_DISABLED',
    searchDisabled: bl
  }
}

exports.loadingscreen = function loadingscreen(bool) {
  console.log('load screen action', bool)
  return {
    type: 'LOADING_SCREEN',
    loading: bool
  }
}


exports.eventView = function eventView(data) {
  return {
    type: "PASS_SEARCH_QUERY",
    prevData: data
  }
}


exports.datePicker = function datePicker() {
  return {
    type: "DATE_PICKER",
  }
}


