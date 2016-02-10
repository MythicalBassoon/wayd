
var login = exports = module.exports

// action sent out after response is received from facebook server regarding auth
exports.user_set = function user_set(user_id, user_last_name, user_first_name, user_email) {
  return {
    type: 'USER_SET',
    user_id: user_id,
    user_first_name: user_first_name,
    user_last_name: user_last_name,
    user_email: user_email
  }
}



