
const initialState = {
  // latlng: '0,0',
  // date: new Date(),
  loading: false,
  apidata: [],
  prevData: {}
}

module.exports = function search(state = initialState, action) {
  console.log('event reducer called: ', state)

  switch (action.type) {
  case 'PASS_SEARCH_QUERY':
    console.log('PASS_SEARCH_QUERY', action)
    return {
      ...state,
      prevData: action.prevData
    };
  case 'GET_DATA':
    console.log('GET_DATA BEING CALLED')
    return {
      ...state,
      apiresults: action.apiresults
    };
  

  default:
    return state
  }
}
