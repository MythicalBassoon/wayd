
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

  case 'DEL_EMAIL':
    console.log('deleting email in reducer', action.emailAddress,' email arr', state.emails);
    var idx = Number(action.emailAddress)
    var newemails = state.emails.slice(0, idx)
    var rest = state.emails.slice(idx+1)
    console.log('rest', rest)
    var revised = newemails.concat(rest)
    console.log('newemails', newemails, 'revised', revised)
    return {
      ...state,
        emails: revised
    };

  default:
    return state
  }
}
