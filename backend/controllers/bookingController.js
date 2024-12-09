const Booking = require('../models/bookingModel');
const User = require('../models/userModel'); // Ensure the filename matches
const { Show } = require('../models/showModel');


// Create a booking
const createBooking = async (req, res) => {
  try {
    const { userEmail, selectedSeats, ticketTypes, showInformation, orderTotal } = req.body;

    // Mapping selectedSeats and ticketTypes to generate a Ticket array
    const tickets = selectedSeats.map((seatName, index) => ({
      seatName,
      ticketType: ticketTypes[index]
    }));

    const newBooking = new Booking({
      userEmail,
      ticketArray: tickets,
      showInformation,
      orderTotal
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Update the Show object to mark the booked seats as unavailable
    const show = await Show.findById(showInformation); // Find the show by its ID
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Loop through the selectedSeats and update the seatAvailability in seatArray
    selectedSeats.forEach((selectedSeat) => {
      const seat = show.seatArray.find((seat) => seat.seatName === selectedSeat);
      if (seat) {
        seat.seatAvailability = false; // Mark the seat as unavailable
      }
    });

    await show.save(); // Save the updated Show object

    // Return the booking data
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for a specific user
const getBookings = async (req, res) => {
  try {
    const { userEmail } = req.params; // Extract userEmail from request parameters

    // Find bookings directly associated with the user's email
    const bookings = await Booking.find({ userEmail });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ bookings: [] }); // Return an empty array with 200 status
    }

    // Return the bookings
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
};
