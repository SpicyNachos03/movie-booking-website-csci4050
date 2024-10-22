const express = require('express');
const { getUsers, getUserByEmail, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse request bodies
router.use(bodyParser.json());

// Route to get all users
router.get('/', getUsers);

// Route to get a user by email
router.get('/:email', getUserByEmail);

// Route to create a new user
router.post('/', createUser);

// Route to update a user by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;

