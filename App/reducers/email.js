
const initialState = {
  emails:[],
  loading: false
}

module.exports = function addEmail(state = initialState, action) {
  // console.log('event reducer called: ', state)
  console.log('in emaili reducer, action is', action);
  switch (action.type) {
  case 'ADD_EMAIL':

  	const newEmails = [...state.emails, action.email];
    
    console.log('newEmails array is', newEmails);
    return {
      ...state,
      emails: newEmails
    };
    
  case 'LOADING_POLL':
  	return {
  		...state,
  			loading: action.loading
  	};

  default:
    return state
  }
}
