var redis = require('redis');
var Queue = require('./queue.js');
var template = require('./template').template
var gmail = require('./apikeys').gmail
if(process.env.DEPLOYED){
var client = redis.createClient('6379', 'redis');

}
else{
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
  console.log('listener');

  emailQueue.pop(function (err, results) {
    if (err) throw new Error(err);

    var emailInfo = JSON.parse(results[1]);
    //console.log('POPPED', JSON.parse(results[1]))

    var mailOptions = {
    from: 'WAYD robot', // sender address
   // to: 'waydhomie@gmail.com', // list of receivers
    // subject: 'Hello ✔', // Subject line
    // text: 'Hello world 🐴', // plaintext body
    // html: '<b>Hello world 🐴</b>' // html body
};

// var emailObj = {
//   to: pollInfo.emails[i],
//   user: 'RICHARD',
//   eventInfo: eventInfo,
//   othersInvited: pollInfo.emails.slice(0,i).concat(pollInfo.emails.slice(i+1))
// }
  console.log('email info is', emailInfo);
  mailOptions.to = emailInfo.to;

  if (!emailInfo.final) {
  console.log('handling initial email');
  mailOptions.subject = 'You have been invited by ' + emailInfo.user;
  mailOptions.html = template(emailInfo.eventInfo.title, emailInfo.to, emailInfo.eventInfo.image_medium, emailInfo.eventInfo.description);
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    runTest()
});

    runTest()
}

else {
  console.log('handling final email');
  if (emailInfo.consensus){
    mailOptions.subject = 'Poll results are in, set your calendar!';
    mailOptions.html = '<b>Get ready to go</b>'; 
  }

  else {
    mailOptions.subject = 'Poll results are in, people don\'t want to go to go!';
    mailOptions.html = '<b>Download wyd to suggest other events!</b>'; 
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