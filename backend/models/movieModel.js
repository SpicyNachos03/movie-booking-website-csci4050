const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Coming Soon', 'Now Showing', 'Special Event', 'Leaving Soon'],
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  cast: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  trailerPicture: {
    type: String,
    required: true,
  },
  trailerVideo: {
    type: String,
    required: true,
  },
  mpaaRating: {
    type: String,
    required: true,
  },
  showInformation: {
    type: [String],
    required: false,
  },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
