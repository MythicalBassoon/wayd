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

// exports.timechange = function timechange(date) {
//   return {
//     type: 'TIME_CHANGE',
//     date: date
//   }
// }




// exports.eventView = function eventView(data) {
//   return {
//     type: "PASS_SEARCH_QUERY",
//     prevData: data
//   }
// }


// exports.getData = function getData(data){
//   // console.log('get data dispatch', data)
//   return{
//     type: "GET_DATA",
//     apiresults: data
//   }
// }

// exports.popEvent = function popEvent(){
//   console.log('pop event')
//   return{
//     type: "POP_EVENT"

//   }
// }

