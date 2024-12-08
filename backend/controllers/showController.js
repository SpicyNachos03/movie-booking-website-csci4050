const { Show } = require('../models/showModel');

// Create a new show
const createShow = async (req, res) => {
    const { movieName, dateTime, roomName, seatArray } = req.body;

    // Validate that required fields are provided
    if (!movieName || !dateTime || !roomName || !Array.isArray(seatArray)) {
        return res.status(400).json({ message: 'Please provide all required fields (movieName, dateTime, roomName, seatArray)' });
    }

    // Initialize seat availability if not provided
    const seats = seatArray.map(seat => ({
        seatName: seat,       // Seat name, e.g., "A1", "B2"
        seatAvailability: true,  // Initially, all seats are available
    }));

    const show = new Show({
        movieName,
        dateTime,
        roomName,
        seatArray: seats,
    });

    try {
        const savedShow = await show.save();
        res.status(201).json(savedShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update seat availability (e.g., mark as booked or available)
const updateSeatAvailability = async (req, res) => {
    const { showId, seatName, availability } = req.body;

    if (typeof availability !== 'boolean') {
        return res.status(400).json({ message: 'Availability must be a boolean' });
    }

    try {
        // Find the show by ID and update the specific seat's availability
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        // Find the seat in the seatArray and update its availability
        const seat = show.seatArray.find(seat => seat.seatName === seatName);
        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        seat.seatAvailability = availability;

        // Save the updated show
        await show.save();
        res.status(200).json({ message: 'Seat availability updated', show });
    } catch (error) {
        res.status(500).json({ message: 'Error updating seat availability', error: error.message });
    }
};

// Get a show by its ID
const getShowById = async (req, res) => {
    const { showId } = req.params;
  
    try {
      const show = await Show.findById(showId);  // Assuming Show is the model for storing shows
  
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
  
      res.status(200).json(show);  // Return the show, which includes the seatArray
    } catch (error) {
      console.error('Error fetching show:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get all shows
const getShows = async (req, res) => {
    try {
        const shows = await Show.find();
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shows', error: error.message });
    }
};

// Get a show by movieId and showtime
const getShowByMovieAndTime = async (req, res) => {
    const { movieId, showtime } = req.params;
  
    try {
      // Match shows based on the movie title and showtime
      const show = await Show.findOne({
        movieName: movieId,  // movieName stores the title in your case
        dateTime: showtime,
      });
  
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
  
      res.status(200).json(show);
    } catch (error) {
      console.error('Error fetching show:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createShow, getShowById, getShows, updateSeatAvailability, getShowByMovieAndTime };
