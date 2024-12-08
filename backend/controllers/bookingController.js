const Booking = require('../models/bookingModel');
const User = require('../models/userModel'); // Ensure the filename matches


// Create a booking
const createBooking = async (req, res) => {
  try {
    const { userEmail, selectedSeats, ticketTypes, showInformation, orderTotal } = req.body;

    // Mapping selectedSeats and ticketTypes to generate a Ticket array
    const tickets = selectedSeats.map((seatName, index) => ({
      seatName,
      ticketType: ticketTypes[index]
    }));

    const newBooking = ({
      userEmail,
      ticketArray: tickets,
      showInformation,
      orderTotal
    });

    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
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
