'use strict';

var sqlLoad = require('sql-load');
var path = require('path');
/**
 * This is a directory of all the SQL strings that are used by the database.
 * To add a Query, create a sql file in the `psql/` directory and then require it
 * in the module.exports object of this file.
 * @type {Object}
 */
module.exports = {

  insertEvent: sqlLoad(path.join(__dirname, './insert-event')),
  insertPoll: sqlLoad(path.join(__dirname, './insert-poll')),
  insertUser: sqlLoad(path.join(__dirname, './insert-user.sql')),
  getOneEvent: sqlLoad(path.join(__dirname, './get-one-event')),
  getOnePoll: sqlLoad(path.join(__dirname, './get-one-poll')),
  getOneUser: sqlLoad(path.join(__dirname, './get-one-user.sql')),
  insertEmail: sqlLoad(path.join(__dirname, './insert-one-email.sql')),

};
