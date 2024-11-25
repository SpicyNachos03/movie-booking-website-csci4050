const express = require('express');
const router = express.Router();
const { createShow, getShowById, getShows } = require('../controllers/showController');

// Adds a Show to the Database
router.post('/', createShow);

// Gets the list of Shows from the Database
router.get('/', getShows);
// Get Show by Id from the Database
router.get('/:id', getShowById);

module.exports = router;