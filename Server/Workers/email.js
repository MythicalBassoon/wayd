var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://waydhomie%40gmail.com:shafique@smtp.gmail.com');

module.exports.sendNodeMailer = function nodeMailer(callback){


// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Richard Thug', // sender address
    to: 'waydhomie@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    callback()
});



}