var redis = require('redis');
var Queue = require('./queue.js');
var template = require('./template').template
var client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

var emailQueue = new Queue('jobs', client);

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://waydhomie%40gmail.com:shafique@smtp.gmail.com');



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

  mailOptions.to = emailInfo.to;
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

  });
}