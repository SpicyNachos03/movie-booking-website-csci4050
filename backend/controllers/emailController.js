import nodemailer from 'nodemailer';
import db from '../models/index.js';

function lastFourDigits(number) {
  let lastFour = "";
  for (let i = 0; i < 4; i++) {
    lastFour = (number % 10) + lastFour;
    number = Math.floor(number / 10);
  }
  return lastFour;
}

let emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  port: 423,
  auth: {
    user: 'moviebookingcsci4050a7@gmail.com',
    pass: 'gudetamachuA7',
  },
});

async function sendVerificationEmail(req, res, next) {

  const verification_link = 'http://localhost:3000/backend/userModel/User/verify?id=' + res.locals.verification_id; //will need to update this base on our implementation

  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com.com>',
    to: res.locals['email'],
    subject: 'Verify your account',
    text: `To verify your account click on the following link: ${verification_link}`,
  });

  next();
}

async function sendResetPasswordEmail(req, res, next) {
  const reset_link = 'http://localhost:3000/forgotpassword.html?id=' + res.locals.reset_password_id; //will need to update this base on our implementation
  
  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com.com>',
    to: res.locals['email'],
    subject: 'Reset Password',
    text: `To reset your password go to: ${reset_link}`,
  });
}

async function sendPasswordWasResetEmail(req, res, next) {
  const was_reset_link = 'http://localhost:3000/forgotpassword.html?id=' + res.locals.reset_password_id; //will need to update this base on our implementation
  
  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com.com>',
    to: res.locals['email'],
    subject: 'Your Password was reset',
    text: `If you did not change your password, go to: ${reset_link}`,
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
${bookingDetails.billingStreet}
${bookingDetails.billingCity}, ${bookingDetails.billingState} ${bookingDetails.billingZip}

Shipping:
${bookingDetails.shippingStreet}
${bookingDetails.shippingCity}, ${bookingDetails.shippingState} ${bookingDetails.shippingZip}

Payment:
${bookingDetails.cardName}
**** **** **** ${lastFourDigits(bookingDetails.cardNumber)}
${bookingDetails.cardMonth} / 20${bookingDetails.cardYear} | ${bookingDetails.cardCvv} | ${bookingDetails.cardZip}

Movies:
`

  let total = 1;
  for (const [id, qty] of Object.entries(JSON.parse(bookingDetails.tickets))) {
    try {
      const movieQuery = await db.movie.findAll({where : {id: id}, raw: true});
      console.log(movieQuery)
      total += movieQuery.length === 0 ? 0 : movieQuery[0].price * qty;
      emailText += `Title: ${movieQuery[0].title}\nQuantity: ${qty}\n\n`;
    } catch (err) {
      console.log(err);
    }
  }

  emailText += `Total: $${total.toFixed(2)}`;

  let emailInfo = await emailTransporter.sendMail({
    from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com.com>',
    to: res.locals.userInfo.email,
    subject: 'Order Confirmation',
    text: emailText,
  });
  next();
}

export {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendOrderConfirmEmail,
  sendPasswordWasResetEmail,
};
