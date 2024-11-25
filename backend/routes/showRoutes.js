const express = require('express');
const router = express.Router();
const { createShow, getShowById } = require('../controllers/showController');

// Adds a Show to the Database
router.post('/', createShow);

// Get Show by Id from the Database
router.get('/:id', getShowById);

module.exports = router;