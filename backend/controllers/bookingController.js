const Booking = require('../models/bookingModel');
const User = require('../models/userModel'); // Ensure the filename matches


// Create a booking
const createBooking = async (req, res) => {
  try {
    const { userId, movieId, showtime, seats } = req.body; // Assuming you're sending these in the body

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new booking
    const newBooking = new Booking({
      user: userId,
      movieId,
      showtime,
      seats,
    });

    // Save the booking to the database
    await newBooking.save();

    // Add the booking to the user's bookings array
    user.bookings.push(newBooking);
    await user.save();

    // Return the created booking
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for a specific user
const getBookings = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed in the URL

    // Find the user by their ID and populate their bookings
    const user = await User.findById(userId).populate('bookings');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's bookings
    res.status(200).json({ bookings: user.bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
};