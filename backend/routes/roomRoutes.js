const express = require('express');
const router = express.Router();
const { createRoom, getRooms } = require('../controllers/roomController');

// Adds a Room to the Database
router.post('/', createRoom);

// Get a list of Rooms from the Database
router.get('/', getRooms);
module.exports = router;
