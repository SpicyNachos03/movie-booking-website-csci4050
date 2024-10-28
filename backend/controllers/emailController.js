const nodemailer = require('nodemailer');
const movieDB = require('../models/movieModel.js');
const userDB = require('../models/userModel.js');

function lastFourDigits(cardNumber) {
  return cardNumber.slice(-4);
}


let emailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'moviebookingcsci4050a7@gmail.com',
    pass: 'rppi guzd ofre szov',
  },
});

async function sendTestEmail() {
  try {
    let emailInfo = await emailTransporter.sendMail({
      from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
      to: 'moviebooking03@gmail.com',
      subject: 'Hello',
      text: 'Hello',
    });

    console.log('Email sent:', emailInfo.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


async function sendConfirmationEmail(userEmail) {
  try {
    let emailInfo = await emailTransporter.sendMail({
      from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
      to: userEmail,
      subject: 'Confirmation of registration',
      text: 'Your registration was successful',
    });

    console.log('Email sent:', emailInfo.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function sendProfileWasChangedEmail(userEmail) {
  try {
    let emailInfo = await emailTransporter.sendMail({
      from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
      to: userEmail,
      subject: 'Notification of changes to your profile',
      text: 'Changes have been made to your user profile',
    });

    console.log('Email sent:', emailInfo.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function sendVerificationEmail(req, res, next) {

  const verification_link = 'http://localhost:8000/api/users/verify?id=' + res.locals.verification_id; //will need to update this base on our implementation

  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
    to: res.locals['email'],
    subject: 'Verify your account',
    text: `To verify your account click on the following link: ${verification_link}`,
  });

  next();
}

async function sendResetPasswordEmail(req, res, next) {
  const reset_link = 'http://localhost:8000/forgotpassword.html?id=' + res.locals.reset_password_id; //will need to update this base on our implementation
  
  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <: moviebookingcsci4050a7@gmail.com>',
    to: res.locals['email'],
    subject: 'Reset Password',
    text: `To reset your password go to: ${reset_link}`,
  });
}

async function sendOrderConfirmEmail(req, res, next) {
  try {
    let emailInfo = await emailTransporter.sendMail({
      from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
      to: user.locals['email'],
      subject: 'Movie Booking Confirmation',
      text: 'Congrats you booked a movie',
    });

    console.log('Email sent:', emailInfo.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendOrderConfirmEmail,
  sendProfileWasChangedEmail,
  sendConfirmationEmail,
};
