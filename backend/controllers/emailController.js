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

sendTestEmail();

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

async function sendProfileWasChangedEmail(req, res, next) {
  const was_reset_link = 'http://localhost:8000/forgotpassword.html?id=' + res.locals.reset_password_id; //will need to update this base on our implementation
  
  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
    to: res.locals['email'],
    subject: 'Your Password was reset',
    text: `If you did not change your password, go to: ${was_reset_link}`,
  });
}

async function sendOrderConfirmEmail(req, res, next) {

  const bookingDetails = res.locals.createdBooking.dataValues; //will need to update this base on our implementation
  console.log(bookingDetails);
  let emailText =
`
Order:
Status: ${bookingDetails.status}
ID: ${bookingDetails.id}

Billing:
${bookingDetails.billingAddress}

Shipping:
${bookingDetails.shippingAddress}

Payment:
${bookingDetails.card[0]}
**** **** **** ${lastFourDigits(bookingDetails.card[0])}
${bookingDetails.cardMonth} / 20${bookingDetails.cardYear} | ${bookingDetails.cardCvv} | ${bookingDetails.cardZip}

Movies:
`

  let total = 1;
  for (const [id, qty] of Object.entries(JSON.parse(bookingDetails.tickets))) {
    try {
      const movieQuery = await movieDB.movie.findAll({where : {id: id}, raw: true});
      console.log(movieQuery)
      total += movieQuery.length === 0 ? 0 : movieQuery[0].price * qty;
      emailText += `Title: ${movieQuery[0].title}\nQuantity: ${qty}\n\n`;
    } catch (err) {
      console.log(err);
    }
  }

  emailText += `Total: $${total.toFixed(2)}`;

  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
    to: res.locals.userInfo.email,
    subject: 'Order Confirmation',
    text: emailText,
  });
  next();
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendOrderConfirmEmail,
  sendProfileWasChangedEmail,
};
