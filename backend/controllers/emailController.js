import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api', // Keep this as 'api'
  key: process.env.MAILGUN_API_KEY, // API Key. Stored in environment variables
  url: 'https://api.mailgun.net',
  domain: process.env.MAILGUN_DOMAIN, // Sandbox Domain. Stored in environment variables
});

// Helper function to get last four digits of card number
function cardNumberToFourDigits(number) {
  let lastFour = "";
  for (let i = 0; i < 4; i++) {
    lastFour = (number % 10) + lastFour;
    number = Math.floor(number / 10);
  }
  return lastFour;
}

// API route handler for sending emails
export default async function handler(req, res) {
  const { type, email, data } = req.body;

  try {
    let emailInfo;
    switch (type) {
      case 'verification':
        emailInfo = await sendVerificationEmail(email, data.verification_link);
        break;
      case 'reset_password':
        emailInfo = await sendResetPasswordEmail(email, data.reset_link);
        break;
      case 'order_confirmation':
        emailInfo = await sendOrderConfirmEmail(email, data.orderDetails);
        break;
      default:
        return res.status(400).json({ error: 'Invalid email type' });
    }

    res.status(200).json({ success: true, emailInfo });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

// Send verification email
async function sendVerificationEmail(toEmail, verification_link) {
  return await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: '"Movie Booking" <noreply@sandbox1234abcd.mailgun.org>',
    to: toEmail,
    subject: 'Verify Account',
    text: `To verify your account go to: ${verification_link}`,
  });
}

// Send reset password email
async function sendResetPasswordEmail(toEmail, reset_link) {
  return await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: '"Movie Booking" <noreply@sandbox1234abcd.mailgun.org>',
    to: toEmail,
    subject: 'Reset Password',
    text: `To reset your password go to: ${reset_link}`,
  });
}

// Send order confirmation email
//ToDo: Booking details. We can have a default implementation for the demo
async function sendOrderConfirmEmail(toEmail, orderDetails) {
  let emailText = `
Order:
Status: ${orderDetails.status}
ID: ${orderDetails.id}

Billing:
${orderDetails.billingStreet}
${orderDetails.billingCity}, ${orderDetails.billingState} ${orderDetails.billingZip}

Shipping:
${orderDetails.shippingStreet}
${orderDetails.shippingCity}, ${orderDetails.shippingState} ${orderDetails.shippingZip}

Payment:
${orderDetails.cardName}
**** **** **** ${cardNumberToFourDigits(orderDetails.cardNumber)}
${orderDetails.cardMonth} / 20${orderDetails.cardYear} | ${orderDetails.cardCvv} | ${orderDetails.cardZip}

Movie:
`;

  let total = 10;
  for (const [movie, qty] of Object.entries(JSON.parse(orderDetails.movies))) {
    total += orderDetails.bookPrices[movie] * qty;
    emailText += `Booking: ${orderDetails.movieId[movie]}\nQuantity: ${qty}\nTitle: ${movie}\n\n`;
  }

  emailText += `Total: $${total.toFixed(2)}`;

  return await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: '"Movie Booking" <noreply@sandbox1234abcd.mailgun.org>',
    to: toEmail,
    subject: 'Order Confirmation',
    text: emailText,
  });
}

//front end example using fetch:
/*
async function sendEmail(emailType, userEmail, data) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: emailType,
        email: userEmail,
        data: data,
      }),
    });
  
    const result = await response.json();
    if (response.ok) {
      console.log('Email sent:', result);
    } else {
      console.error('Error sending email:', result.error);
    }
  }
  
  // Example usage:
  // Sending verification email
  sendEmail('verification', 'user@example.com', { verification_link: 'http://your-site.com/verify?id=123' });
  */
  