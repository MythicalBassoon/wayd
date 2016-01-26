
var actions = exports = module.exports



exports.add = function add() {
  console.log('IN THE ADD ACTION')
  return {
    type: 'ADD',
  }
}



exports.subtract = function subtract() {
  return {
    type: 'SUB'
  }
}
