const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const log = console.log;
require("dotenv").config();

var auth = {
  auth: {
    api_key: "key-f219d873b6e085311732898298348192",
    domain: "sandbox8c64a35c7dac4165a4e6a9bb8115c44e.mailgun.org",
  },
};
let transporter = nodemailer.createTransport(mailgun(auth));

// // Step 3
// let mailOptions = {
//     from: 'bhandarik667@gmail.com', // TODO: email sender
//     to: 'booksabjikothi@gmail.com', // TODO: email receiver
//     subject: 'Nodemailer - Test',
//     text: 'Wooohooo it works!!'
// };

// // Step 4
// transporter.sendMail(mailOptions, (err, data) => {
//     if (err) {
//         return log(err);
//     }
//     return log('Email sent!!!');
// });

const sendMail = (email, subject, text,name,State,Address,Zip,Quantity,cb) => {
  // Step 3
  let mailOptions = {
    from: email, // TODO: email sender
    to: "booksabjikothi@gmail.com", // TODO: email receiver
    subject: subject,
    text: name+' '+text+' '+'Address:'+Address+' '+State+' '+Zip+' '+Quantity,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      return cb(err, null);
    }
    return cb(null, data);
  });
};

module.exports = sendMail;
