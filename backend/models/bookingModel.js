const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
  },
  ticketNumbers: {
    type: [String],
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,  // Correctly define movieId as ObjectId
    ref: 'movieModel',  // Reference the 'Movie' model
    required: true,
  },
  showInformation: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
