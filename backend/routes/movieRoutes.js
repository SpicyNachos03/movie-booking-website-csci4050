const express = require('express');
const { getMovies, getMovieById, createMovie } = require('../controllers/movieController');
const router = express.Router();

// Route to get all movies
router.get('/', getMovies);

// Route to get a movie by ID
router.get('/:id', getMovieById);

// Route to create a new movie
router.post('/', createMovie);

module.exports = router;