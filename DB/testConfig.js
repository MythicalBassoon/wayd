//create connection here
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
var connectionString = process.env.DATABASE_URL||"postgres://localhost:5432/waydtest";

//create new db instance
var testDb = pgp(connectionString);
module.exports = testDb;

//to test locally you must create a database 'wayd' in postgres

