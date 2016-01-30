var redis = require('redis');
var Queue = require('./queue.js');
var client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});
var emailQueue = new Queue('jobs', client);


runTest();

function runTest() {
  console.log('listener');

  emailQueue.pop(function (err, results) {
    if (err) throw new Error(err);

    console.log('POPPED', JSON.parse(results[1]))

    runTest()

   //someone in here do a runTest()
  });
}