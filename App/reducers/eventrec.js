
const initialState = {
  loading: true,
  apiresults: [],
  prevData: {},
  currentEvent: {}
}

module.exports = function search(state = initialState, action) {
  // console.log('event reducer called: ', state)

  switch (action.type) {
  case 'PASS_SEARCH_QUERY':
    // console.log('PASS_SEARCH_QUERY', action)
    return {
      ...state,
      prevData: action.prevData
    };
  case 'LOADING_SCREEN':
    // console.log('LOADINGSCREEN BEING CALLED')
    return {
      ...state,
      loading: action.loading
    };
  case 'GET_DATA':
    // console.log('GET_DATA BEING CALLED')
    return {
      ...state,
      apiresults: action.apiresults
    };
  case "POP_EVENT":
    // console.log('pop reducer BEING CALLED', state)

    var currentEvent = state.apiresults.slice(-1)[0]
    var newApiRes = state.apiresults.slice(0, state.apiresults.length-1)
    console.log('cur event', currentEvent)
     console.log('new api results', newApiRes[newApiRes.length-1])
    return {
      ...state,
      apiresults: newApiRes,
      currentEvent: currentEvent
    };
    
  default:
    return state
  }
}
