var email = exports = module.exports

// Actions dispatched from search page
exports.addEmail = function addEmail(email) {
  console.log(email)
  return {
    type: 'ADD_EMAIL',
    email: email
  }
}

exports.loadingPoll = function loadingPoll(bool) {
  console.log('load poll action', bool)
  return {
    type: 'LOADING_POLL',
    loading: bool
  }
}

exports.delEmail = function delEmail(emailAddress) {
  return {
    type: 'DEL_EMAIL',
    emailAddress: emailAddress
  }
}

exports.addContacts = function addContacts(contacts){
  return {
    type: 'ADD_CONTACTS',
    contacts: contacts
  }
}

