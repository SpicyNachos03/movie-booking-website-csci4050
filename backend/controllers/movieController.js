const Movie = require('../models/movieModel');

// Get all movies
const getMovies = async (req, res) => {
  try {
    console.log('Attempting to fetch movies...');
    const movies = await Movie.find();
    res.json(movies);
    console.log('Movies fetched successfully:', movies);
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
  const { title, category, status, posterUrl, cast, director, producer, synopsis, reviews, trailerPicture, trailerVideo, mpaaRating } = req.body;

  const movie = new Movie({
    title,
    category,
    status,
    posterUrl,
    cast,
    director,
    producer,
    synopsis,
    reviews,
    trailerPicture,
    trailerVideo,
    mpaaRating,
  });
  try {

    console.log('Movie object before saving:', movie);

    const savedMovie = await movie.save();
    console.log('Saved movie:', savedMovie);
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error saving movie:', error);
    res.status(400).json({ message: error.message });
  }
};


// Update movie by ID
const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: req.params.id }, // Find movie by ID
      req.body, // Full movie update
      { new: true, runValidators: true } // Return updated doc and validate
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: error.message });
  }
};


// Controller method to handle the PATCH request for seating
const updateSeatingStatus = async (req, res) => {
  const movieId = req.params.id;
  const { row, seatNumber, status } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Find the row and seat
    const rowObj = movie.seating.find(seat => seat.row === row);
    if (!rowObj) {
      return res.status(404).json({ message: 'Row not found' });
    }

    const seat = rowObj.seats.find(seat => seat.seatNumber === seatNumber);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    // Update the seat status
    seat.status = status;
    await movie.save();
    
    res.json({ message: 'Seating status updated successfully', movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSeatingStatus = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id, 'seating'); // Only fetch the seating field
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie.seating);
  } catch (error) {
    console.error('Error fetching seating status:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, updateSeatingStatus, getSeatingStatus };
