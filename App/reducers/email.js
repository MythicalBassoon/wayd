
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
    
    //     var currentEvent = state.apiresults.slice(-1)[0]
    // var newApiRes = state.apiresults.slice(1, state.apiresults.length-1)

    var idx = state.emails.indexOf(action.emailAddress);
    console.log('i',idx)
    var newemails = state.emails.slice(0, idx)
    var rest = state.emails.slice(idx+1)
    var revised = newemails.concat(rest)
    console.log('newemails 1', newemails, 'rest', rest, 'new', revised)


    return {
      ...state,
        emails: revised
    };






  default:
    return state
  }
}
