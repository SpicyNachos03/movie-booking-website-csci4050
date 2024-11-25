// routes/seatingRoutes.js
const express = require('express');

const router = express.Router();

// Route to save selected seats to the database
router.post('/saveSeatingChart', async (req, res) => {
  try {
    const { movieId, showtime, selectedSeats, ticketTypes } = req.body;

    // Find the show by movieId and showtime
    const show = await Show.findOne({ movieId, showInformation: showtime });

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    const roomId = show.roomId;

    // Map selectedSeats to the Seat model
    const seatsToSave = selectedSeats.map((seatId, index) => ({
      showId: show._id,
      roomId: roomId,
      status: true, // Seat is selected (booked)
      seatId,
      ticketType: ticketTypes[index],
    }));

    // Save selected seats to the database
    await Seat.insertMany(seatsToSave);

    res.status(200).json({ message: 'Seating chart saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save seating chart' });
  }
});

module.exports = router;
