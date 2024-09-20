const Movie = require('../models/movieModel');

// Get all movies
const getMovies = async (req, res) => {
  try {
    console.log('Attempting to fetch movies...');
    const movies = await Movie.find();
    console.log('Movies fetched successfully:', movies);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  const { name, posterUrl, status, showingTimes } = req.body;
  try {
    const movie = new Movie({ name, posterUrl, status, showingTimes });
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMovies, getMovieById, createMovie };
