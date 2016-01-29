const { combineReducers } = require('redux')
const search = require('./search')
const eventrec = require('./eventrec')

//combined reducers. REMEMBER: what you name reducer in this file will be the name of the object where that
//state variable is located in. EXAMPLE: latlng will be accessed in containers as state.search.latlng
const rootReducer = combineReducers({
  search, eventrec
})

module.exports = rootReducer
