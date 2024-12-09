const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController'); // Adjust path if needed

// Define routes

// Makes a new Booking
router.post('/', createBooking);

// Grabs all Bookings
router.get('/:userEmail', getBookings);




module.exports = router;
