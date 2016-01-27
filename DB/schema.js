var db = require('./config.js');


//SCHEMAS ---------------------------------------------
//Cannot use USER as a table name || forbidden words: http://www.postgresql.org/docs/current/interactive/sql-keywords-appendix.html
db.query(
  "CREATE TABLE IF NOT EXISTS users (first_name VARCHAR(40),"
    + "last_name VARCHAR(40)," 
    + "user_name VARCHAR(40)," 
    + "password VARCHAR(40)," 
    + "access_token VARCHAR(1000)," 
    + "id SERIAL PRIMARY KEY)"
  )
.then(function(){
   console.log('users created');
   return db.query("CREATE TABLE IF NOT EXISTS events (title VARCHAR(40),"
    + "description VARCHAR(1000),"
    + "start_time VARCHAR (40)," 
    + "stop_time VARCHAR (40)," 
    + "category VARCHAR(40)," 
    + "address VARCHAR(500),"
    + "city VARCHAR(500),"
    + "state VARCHAR(500),"
    + "lat VARCHAR(10)," 
    + "long VARCHAR(10)," 
    + "source VARCHAR(20)," 
    + "source_id VARCHAR(20),"
    + "image_thumb VARCHAR(1000),"
    + "image_medium VARCHAR(1000),"
    + "id SERIAL PRIMARY KEY)"
   )
 })
.then(function(){
   console.log('events created');
   return db.query("CREATE TABLE IF NOT EXISTS polls (vote_count INTEGER,"
    + "num_participants INTEGER,"
    + "user_id INTEGER,"
    + "event_id INTEGER,"
    + "FOREIGN KEY (user_id) REFERENCES users(id),"
    + "FOREIGN KEY (event_id) REFERENCES events(id),"
    + "id SERIAL PRIMARY KEY)"
   )
 })
.then(function(){
   console.log('polls created');
   return db.query("CREATE TABLE IF NOT EXISTS emails (email VARCHAR(40),"
    + "poll_id INTEGER,"
    + "FOREIGN KEY (poll_id) REFERENCES polls(id)"
    + ")"
   )
 })
 
 .then(function(){
   console.log('emails created, database build completed');

 })

.catch(function(error){
  console.log('error creating tables');
  console.log(error);
});

