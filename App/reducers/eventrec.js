
const initialState = {
  loading: false,
  apidata: [],
  prevData: {},
  currentImg: {}
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
  

  default:
    return state
  }
}
