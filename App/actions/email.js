var email = exports = module.exports

// Actions dispatched from search page

//adds email to email array
exports.addEmail = function addEmail(email) {
  console.log(email)
  return {
    type: 'ADD_EMAIL',
    email: email
  }
}


//truthy property on state while events API is hit
exports.loadingPoll = function loadingPoll(bool) {
  console.log('load poll action', bool)
  return {
    type: 'LOADING_POLL',
    loading: bool
  }
}

//removes email from email array
exports.delEmail = function delEmail(emailAddress) {
  return {
    type: 'DEL_EMAIL',
    emailAddress: emailAddress
  }
}

//array of contacts
exports.addContacts = function addContacts(contacts){
  return {
    type: 'ADD_CONTACTS',
    contacts: contacts
  }
}

