const express = require('express');
const router = express.Router();
const { createRoom } = require('../controllers/roomController');

// Adds a Room to the Database
router.post('/', createRoom);

module.exports = router;
