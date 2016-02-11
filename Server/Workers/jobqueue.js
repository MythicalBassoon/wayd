var redis = require('redis');
var Queue = require('./queue.js');
var template = require('../Templates/invite').template
var attendingTemplate = require('../Templates/attending').template
var rejectedTemplate = require('../Templates/rejecting').template
var gmail = require('./apikeys').gmail
var moment = require('moment')
if(process.env.DEPLOYED){
var client = redis.createClient('6379', 'redis');

if(process.env.DEPLOYED) {
  var client = redis.createClient('6379', 'redis');
} else {
  var client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
  });
}

var emailQueue = new Queue('jobs', client);
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(gmail);

runTest();

function runTest() {
  // console.log('listener');
  emailQueue.pop(function (err, results) {
    if (err) throw new Error(err);

    var emailInfo = JSON.parse(results[1]);
    var startTime = moment(emailInfo.start_time).calendar()
    //console.log('POPPED', JSON.parse(results[1]))

    // INITIALIZE MAIL OPTIONS
    var mailOptions = {

    from: 'WAYD robot', 
};

  //console.log('email info is', emailInfo);
  mailOptions.to = emailInfo.to;

  if (!emailInfo.final) {
  console.log('handling initial email')
  mailOptions.subject = 'You have been invited by ' + emailInfo.user;
  mailOptions.html = template(emailInfo.eventInfo.title, emailInfo.to, emailInfo.eventInfo.category_image, emailInfo.eventInfo.description, emailInfo.emailId, emailInfo.eventInfo.address, emailInfo.eventInfo.city, emailInfo.eventInfo.state, emailInfo.eventInfo.image_thumb, startTime);
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    //console.log('Message sent: ' + info.response);
    runTest()
});

    runTest()
}

else {
  console.log('handling final email');
  if (emailInfo.consensus){
    mailOptions.subject = 'Poll results are in, set your calendar!';
    mailOptions.html = attendingTemplate(emailInfo.eventInfo.title, emailInfo.to, emailInfo.eventInfo.category_image, emailInfo.eventInfo.description, emailInfo.emailId, emailInfo.eventInfo.address, emailInfo.eventInfo.city, emailInfo.eventInfo.state, emailInfo.eventInfo.image_thumb, startTime); 
  }

  else {
    mailOptions.subject = 'Poll results are in, people don\'t want to go to go!';
    mailOptions.html = rejectedTemplate(emailInfo.eventInfo.title, emailInfo.to, emailInfo.eventInfo.category_image, emailInfo.eventInfo.description, emailInfo.emailId, emailInfo.eventInfo.address, emailInfo.eventInfo.city, emailInfo.eventInfo.state, emailInfo.eventInfo.image_thumb, startTime); 
  }
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    runTest()
});

    runTest()

}
  });
}
