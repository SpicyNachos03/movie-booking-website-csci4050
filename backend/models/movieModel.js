const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  posterUrl: { type: String, required: true },
  status: { type: String, enum: ['Now Showing', 'Coming Soon', 'Special Event'], required: true },
  showingTimes: { type: [String], required: true },
  seating: {
    type: [
      {
        row: { type: String, required: true },
        seats: [
          {
            seatNumber: { type: String, required: true },
            status: { type: String, enum: ['available', 'occupied', 'selected'], default: 'available' }
          }
        ]
      }
    ],
    default: [] // Ensure it's an empty array if not provided
  },
  ticketPrices: {
    children: { type: Number, required: true, default: 10 },
    adults: { type: Number, required: true, default: 12 },
    seniors: { type: Number, required: true, default: 10 }
  }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
