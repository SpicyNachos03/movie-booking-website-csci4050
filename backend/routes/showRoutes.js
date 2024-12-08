const express = require('express');
const router = express.Router();
const { createShow, getShowById, getShows, updateSeatAvailability, getShowByMovieAndTime } = require('../controllers/showController');

// Route to create a new show
router.post('/', createShow);

// Route to get a show by its ID (showId)
router.get('/show/:showId', getShowById);

// Route to get all shows
router.get('/', getShows);

// Route to update seat availability
router.put('/update-seat', updateSeatAvailability);

// Route to get a show by movieId and showtime
router.get('/show/:movieId/:showtime', getShowByMovieAndTime);

module.exports = router;

