const nodemailer = require('nodemailer');
const movieDB = require('../models/movieModel.js');
//const userDB = require('../models/userModel.js');
const userDB = require('../models/userModel.js');
const promotionDB = require('../models/promotionModel.js');
const bookingDB = require('../models/bookingModel.js');
const showDB = require('../models/showModel.js').Show;

async function sendPromotionNotificationEmail() {
  try {
    // Query the database to find users who have subscribed to promotions
    const subscribedUsers = await userDB.find({ promotions: true });

    if (subscribedUsers.length === 0) {
      console.log('No users found who have subscribed to promotions.');
      return;
    }

    // Fetch the latest promotion
    const latestPromotion = await promotionDB.findOne().sort({ _id: -1 }); // Sort by ID to get the latest entry
    if (!latestPromotion) {
        console.log('No promotions found in the database.');
        return;
    }
    const { promotionName, promotionRate } = latestPromotion;

    for (const user of subscribedUsers) {
      try {
        let emailInfo = await emailTransporter.sendMail({
          from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
          to: user.email, // Access the email field from the User model
          subject: 'Notification of promotion',
          text: `Dear ${user.firstName},\n\nWe are excited to announce a new promotion just for you!\n\nPromotion: ${promotionName}\nDiscount: ${promotionRate}% off\n\nLog in to your profile now to take advantage of this amazing deal.\n\nBest regards,\nMovie Booking Team`,
        });

        console.log(`Email sent to ${user.email}:`, emailInfo.messageId);
      } catch (error) {
        console.error(`Error sending email to ${user.email}:`, error);
      }
    }
  } catch (error) {
    console.error('Error querying the user database:', error);
  }
}

async function sendBookingNotificationEmail(booking) {
  try {
    //get show information
    const showDetails = await showDB.findById(booking.showInformation);
    if (!showDetails) {
      console.error('Show details not found for booking:', booking.showInformation);
      return;
    }
    //get ticket information
    const ticketDetails = booking.ticketArray
      .map(ticket => `${ticket.ticketType} Ticket - Seat: ${ticket.seatName}`)
      .join('\n');

    const emailText = `
      Dear Customer,

      Thank you for booking with us! Here are your booking details:

      Movie: ${showDetails.movieName}
      Showtime: ${showDetails.dateTime}
      Room: ${showDetails.roomName}
      Tickets:
      ${ticketDetails}

      Total Cost: $${booking.orderTotal}

      Enjoy your movie!

      Best regards,
      Movie Booking Team`;

    let emailInfo = await emailTransporter.sendMail({
      from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
      to: booking.userEmail,
      subject: 'Your Booking Confirmation',
      text: emailText,
    });

    console.log(`Email sent to ${booking.userEmail}:`, emailInfo.messageId);
  } catch (error) {
    console.error(`Error sending email to ${booking.userEmail}:`, error);
  }
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

//sendTestEmail();

function lastFourDigits(cardNumber) {
  return cardNumber.slice(-4);
}

async function sendTestEmail() {
  try {
    let emailInfo = await emailTransporter.sendMail({
      from: '"Movie Booking" <moviebookingcsci4050a7@gmail.com>',
      //to: 'moviebooking03@gmail.com',
      to: 'muddymudblood@gmail.com',
      subject: 'Hello',
      text: 'Hello',
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
  sendPromotionNotificationEmail,
  sendBookingNotificationEmail,
};
