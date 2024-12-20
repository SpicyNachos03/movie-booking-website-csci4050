const { Show } = require('../models/showModel');

// Create a new show
const createShow = async (req, res) => {
    const { movieName, dateTime, roomName } = req.body;

    // Validate that required fields are provided
    if (!movieName || !dateTime || !roomName) {
        return res.status(400).json({ message: 'Please provide all required fields (movieName, dateTime, roomName, seatArray)' });
    }

    // Initialize seat availability if not provided
    const rows = ["A", "B", "C", "D", "E", "F"];
    const columns = 10;
    const seatArray = [];

    rows.forEach((row) => {
        for (let col = 1; col <= columns; col++) {
            seatArray.push({
                seatName: `${row}${col}`,
                seatAvailability: true
            });
        }
    });

    const show = new Show({
        movieName,
        dateTime,
        roomName,
        seatArray,
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

const getShowsByShowtime = async (req, res) => {
    const { showtime } = req.query;

    // Validate that showtime is provided
    if (!showtime) {
        return res.status(400).json({ message: 'Showtime is required as a query parameter' });
    }

    try {
        // Parse the showtime input to a Date object
        const parsedShowtime = new Date(showtime);

        if (isNaN(parsedShowtime.getTime())) {
            return res.status(400).json({ message: 'Invalid showtime format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ).' });
        }

        // Query shows based on the parsed datetime
        const shows = await Show.find({
            dateTime: parsedShowtime,
        });

        if (shows.length === 0) {
            return res.status(404).json({ message: 'No shows found for the given showtime' });
        }

        res.status(200).json({ success: true, data: shows });
    } catch (error) {
        console.error('Error fetching shows by showtime:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createShow, getShowById, getShows, updateSeatAvailability, getShowByMovieAndTime, getShowsByShowtime };
