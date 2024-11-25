const mongoose = require('mongoose');
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

// Get movie by ID
  const getMovieById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Validate ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`Invalid movie ID format: ${id}`);
        return res.status(400).json({ message: 'Invalid movie ID format' });
      }
  
      const movie = await Movie.findById(id);
      if (!movie) {
        console.error(`Movie with ID ${id} not found in database.`);
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json(movie);
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error.message);
      res.status(500).json({ message: 'Error fetching movie', error: error.message });
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

    const savedMovie = await movie.save();
    console.log('Saved movie:', savedMovie);
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error creating movie:', error.message);
    res.status(400).json({ message: 'Error creating movie', error: error.message });
  }
};

// Update movie details
const updateMovie = async (req, res) => {
  const { id } = req.params;
  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid movie ID format' });
  }

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error.message);
    res.status(500).json({ message: 'Error updating movie', error: error.message });
  }
};

// Update seating status
const updateSeatingStatus = async (req, res) => {
  const movieId = req.params.id;
  const { row, seatNumber, status } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const rowObj = movie.seating.find((seatRow) => seatRow.row === row);
    if (!rowObj) {
      return res.status(404).json({ message: 'Row not found' });
    }

    const seat = rowObj.seats.find((seat) => seat.seatNumber === seatNumber);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    seat.status = status;
    await movie.save();

    res.json({ message: 'Seating status updated successfully', seating: movie.seating });
  } catch (error) {
    console.error('Error updating seating status:', error.message);
    res.status(500).json({ message: 'Error updating seating status', error: error.message });
  }
};

// Get seating status
const getSeatingStatus = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid movie ID format' });
  }

  try {
    const movie = await Movie.findById(id, 'seating'); // Only fetch the seating field
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie.seating);
  } catch (error) {
    console.error('Error fetching seating status:', error);
    res.status(500).json({ message: error.message });
  }
};



const searchMovies = async (req, res) => {
  const { title, category } = req.query;
  console.log(req);
  try {
    // Build a dynamic query object
    const query = {};
    
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex for title
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' }; // Case-insensitive regex for category
    }


    // Perform the search with the constructed query
    const movies = await Movie.find(query);

    if (movies.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No movies found matching the search criteria.',
      });
    }

    // Return the results
    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while searching for movies.',
      error: error.message,
    });
  }
};


module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  updateSeatingStatus,
  getSeatingStatus,
  searchMovies
};