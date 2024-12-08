const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController'); // Adjust path if needed

// Define routes
router.post('/bookings', bookingController.createBooking);
router.get('/bookings/:userId', bookingController.getBookings);

module.exports = router;
