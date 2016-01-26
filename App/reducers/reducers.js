const initialState = {
	votes: 0
}

module.exports = function items(state = initialState, action) {
	console.log('reducers called: ', state)

  switch (action.type) {
  case 'ADD':
  	console.log('ADD BEING CALLED')
    return {
      ...state,
      votes: state.votes + 1
    }
  case 'SUB':

    return {
      ...state,
      votes: state.votes - 1
    }
  
  default:
    return state
  }
}