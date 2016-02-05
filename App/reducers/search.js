const initialState = {
	latlng: '0,0',
  date: new Date(),
  loading: false,
  datePicked: 0,
  searchButton: false
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
    case 'SEARCH_DISABLED':
       console.log('searchdisabled BEING CALLED ', action.searchDisabled )
      return {
        ...state,
        searchButton: action.searchDisabled
      };
  case 'TIME_CHANGE':
    console.log('TIME_CHANGE BEING CALLED', action)
    return {
      ...state,
      date: action.date
    };
  case 'DATE_PICKER':
    console.log('"DATE_PICKER BEING CALLED', state)
      var datePicked;
      if (state.datePicked === 0) {
        datePicked = 1;
      } else if (state.datePicked === 1) {
        datePicked = 0;
      } else {
        // need to add this weekend
      }
      
    return {
      ...state,
      datePicked: datePicked
    };

  default:
    return state
  }
}
