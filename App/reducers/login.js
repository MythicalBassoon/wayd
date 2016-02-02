const initialState = {
	user_id: '',
  user_last_name: '',
  user_first_name: '',
  user_email: ''
}

module.exports = function search(state = initialState, action) {
	// console.log('search reducer called: ', state)

  switch (action.type) {
  case 'USER_SET':
  	// console.log('LATLNG BEING CALLED')
    return {
      ...state,
      user_id: action.user_id,
      user_last_name: action.user_last_name,
      user_first_name: action.user_first_name,
      user_email: action.user_email
    }
  default:
    return state
  }
}
