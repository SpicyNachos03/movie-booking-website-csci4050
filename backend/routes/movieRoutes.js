const express = require('express');
const { getMovies, getMovieById, createMovie, updateSeatingStatus, updateMovie, getSeatingStatus } = require('../controllers/movieController');
const router = express.Router();
const bodyParser = require("body-parser");

// Route to get all movies
router.get('/', getMovies);

// Route to get a movie by ID
router.get('/:id', getMovieById);

// Route to create a new movie
router.post('/', createMovie);

router.get('/:id/seating', getSeatingStatus);  // if you need to just fetch seating status

// Route to update the seating status for a movie
router.patch('/:id/seating', updateSeatingStatus);
module.exports = router;