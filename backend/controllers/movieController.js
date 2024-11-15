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

// Create a new movie
const createMovie = async (req, res) => {
  console.log('Received request body:', req.body); // Log incoming request body
  const {
    title,
    category,
    cast,
    director,
    producer,
    synopsis,
    reviews,
    trailerPicture,
    trailerVideo,
    mpaaRating,
    showInformation,
    status,
    posterUrl,
  } = req.body;

  try {
    const movie = new Movie({
      title,
      category,
      cast,
      director,
      producer,
      synopsis,
      reviews,
      trailerPicture,
      trailerVideo,
      mpaaRating,
      showInformation,
      status,  // Ensure this field is included
      posterUrl // Ensure this field is included
    });

    const savedMovie = await movie.save();
    console.log('Saved movie:', savedMovie);  // Log the saved movie to check if status and posterUrl are saved
    res.status(201).json({
      title: savedMovie.title,
      status: savedMovie.status,
      posterUrl: savedMovie.posterUrl,
      otherFields: savedMovie._doc // Optional: log other fields to check
    });
  } catch (error) {
    console.error('Error creating movie:', error.message);
    res.status(400).json({ message: 'Error creating movie', error: error.message });
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

module.exports = { getMovies, getMovieById, createMovie, updateMovie, updateSeatingStatus, getSeatingStatus };
