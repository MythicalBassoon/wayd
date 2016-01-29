const initialState = {
	latlng: '0,0',
  date: new Date(),
  loading: false
}

module.exports = function search(state = initialState, action) {
	// console.log('search reducer called: ', state)

  switch (action.type) {
  case 'LATLNG':
  	// console.log('LATLNG BEING CALLED')
    return {
      ...state,
      latlng: action.latlong
    };
  case 'TIME_CHANGE':
    // console.log('TIME_CHANGE BEING CALLED')
    return {
      ...state,
      date: action.date
    };

  default:
    return state
  }
}
