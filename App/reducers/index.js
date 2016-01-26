const { combineReducers } = require('redux')
const voteZ = require('./reducers')

const rootReducer = combineReducers({
  voteZ
})

module.exports = rootReducer
