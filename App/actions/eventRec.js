var eventRec = exports = module.exports

// Actions dispatched from search page
exports.addCurrentEvent = function addCurrentEvent(event) {
  console.log(event)
  return {
    type: 'ADD_CURRENT_EVENT',
    currentEvent: event
  }
}

//stores api data on state
exports.getData = function getData(data){
  return{
    type: "GET_DATA",
    apiresults: data
  }
}

//remove event from initial events array
exports.popEvent = function popEvent(){
  console.log('pop event')
  return{
    type: "POP_EVENT"

  }
}

//loading screen
exports.loadingscreen = function loadingscreen(bool) {
  return {
    type: 'LOADING_SCREEN',
    loading: bool
  }
}
