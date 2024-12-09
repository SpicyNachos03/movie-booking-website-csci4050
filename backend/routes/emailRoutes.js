const express = require('express');
const { sendPromotionNotificationEmail } = require('../controllers/emailController');
const { sendBookingNotificationEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/sendPromotionEmails', async (req, res) => {
  try {
    await sendPromotionNotificationEmail();
    res.status(200).json({ message: 'Promotion emails sent successfully.' });
  } catch (error) {
    console.error('Error sending promotion emails:', error);
    res.status(500).json({ error: 'Failed to send promotion emails.' });
  }
});

router.post('/sendBookingEmails', async (req, res) => {
  const booking = req.body;
  try {
    await sendBookingNotificationEmail(booking);
    res.status(200).json({ message: 'Booking email sent successfully.' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ error: 'Failed to send booking email.' });
  }
});

module.exports = router;
