var eventRec = exports = module.exports

// Actions dispatched from search page
exports.addCurrentEvent = function addCurrentEvent(event) {
  console.log(event)
  return {
    type: 'ADD_CURRENT_EVENT',
    currentEvent: event
  }
}

exports.getData = function getData(data){
  // console.log('get data dispatch', data)
  return{
    type: "GET_DATA",
    apiresults: data
  }
}

exports.popEvent = function popEvent(){
  console.log('pop event')
  return{
    type: "POP_EVENT"

  }
}

exports.loadingscreen = function loadingscreen(bool) {
  console.log('load screen action', bool)
  return {
    type: 'LOADING_SCREEN',
    loading: bool
  }
}
