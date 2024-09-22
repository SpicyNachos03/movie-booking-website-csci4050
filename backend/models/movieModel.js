const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Now Showing', 'Coming Soon', 'Special Event'],
    required: true,
  },
  showingTimes: {
    type: [String], // Array of time strings
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema, "Movies");
module.exports = Movie;
