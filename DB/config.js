//create connection here
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
if(process.env.DEPLOYED){
	var connectionString = {
    host: 'postgres', // server name or IP address; 
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword'
};
}
else{
var connectionString = process.env.DATABASE_URL||"postgres://localhost:5432/wayd";

}

//create new db instance
var db = pgp(connectionString);
module.exports = db;

//to test locally you must create a database 'wayd' in postgres

