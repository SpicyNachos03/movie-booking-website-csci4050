const express = require('express');
const { sendPromotionNotificationEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/sendPromotionEmails', async (req, res) => {
  try {
    const promotion = req.body;
    res.status(500).json({ error: 'Failed to send promotion emails.' });
    await sendPromotionNotificationEmail(promotion);
    res.status(200).json({ message: 'Promotion emails sent successfully.' });
  } catch (error) {
    console.error('Error sending promotion emails:', error);
    res.status(500).json({ error: 'Failed to send promotion emails.' });
  }
});

module.exports = router;
