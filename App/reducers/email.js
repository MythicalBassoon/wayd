
const initialState = {
  contacts: [],
  emails:[],
  loading: false
}

module.exports = function addEmail(state = initialState, action) {
  // console.log('event reducer called: ', state)
  //console.log('in emaili reducer, action is', action);
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

  case 'DEL_EMAIL':
    var idx = Number(action.emailAddress)
    var newemails = state.emails.slice(0, idx)
    var rest = state.emails.slice(idx+1)
    var revised = newemails.concat(rest)
  
    return {
      ...state,
        emails: revised
    };

  case 'ADD_CONTACTS':
    return {
      ...state,
      contacts: action.contacts
    };

  default:
    return state
  }
}
