const express = require('express');
const emailController = require('../controllers/emailController');
const router = express.Router();

router.post('/notify-promotion', async (req, res) => {
  try {
    await emailController.sendPromotionNotificationEmail();
    res.status(200).json({ message: 'Promotion notification emails sent successfully.' });
  } catch (error) {
    console.error('Error sending promotion notification emails:', error);
    res.status(500).json({ message: 'Failed to send promotion notification emails.', error });
  }
});

module.exports = router;
