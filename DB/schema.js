var db = require('./config.js');


//Create a postgres db named 'wayd' prior to bringing server up - this file creates tables in this db


db.query(

  //Create users table
  "CREATE TABLE IF NOT EXISTS users (first_name VARCHAR(40),"
    + "last_name VARCHAR(40)," 
    + "user_name VARCHAR(40)," 
    + "password VARCHAR(40)," 
    + "access_token VARCHAR(1000)," 
    + "id SERIAL PRIMARY KEY)"
  )
.then(function(){
   console.log('users created');

   //create events table
   return db.query("CREATE TABLE IF NOT EXISTS events (title VARCHAR(100),"
    + "description VARCHAR(10000),"
    + "start_time VARCHAR (40)," 
    + "stop_time VARCHAR (40)," 
    + "category VARCHAR(40)," 
    + "address VARCHAR(500),"
    + "city VARCHAR(500),"
    + "state VARCHAR(500),"
    + "lat VARCHAR(40)," 
    + "long VARCHAR(40)," 
    + "source VARCHAR(50)," 
    + "source_id VARCHAR(50),"
    + "image_thumb VARCHAR(5000),"
    + "image_medium VARCHAR(5000),"
    + "category_image VARCHAR(5000),"
    + "id SERIAL PRIMARY KEY)"
   )
 })
.then(function(){
   console.log('events created');

   //create polls table
   return db.query("CREATE TABLE IF NOT EXISTS polls (event_id INTEGER,"
    + "user_id INTEGER,"
    + "num_participants INTEGER,"
    + "yes_count INTEGER DEFAULT 0,"
    + "no_count INTEGER DEFAULT 0,"
    + "FOREIGN KEY (user_id) REFERENCES users(id),"
    + "FOREIGN KEY (event_id) REFERENCES events(id),"
    + "id SERIAL PRIMARY KEY)"
   )
 })
.then(function(){
   console.log('polls created');

   //create emails
   return db.query("CREATE TABLE IF NOT EXISTS emails (email VARCHAR(40),"
    + "poll_id INTEGER,"
    + "voted BOOLEAN DEFAULT false,"
    + "id SERIAL PRIMARY KEY,"
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

