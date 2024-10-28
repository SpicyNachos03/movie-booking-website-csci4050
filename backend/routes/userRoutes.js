const express = require('express');
const {
  getUsers,
  getUserByEmail,
  createUser,
  userLogin,
  updateUser,
  getUserById
} = require('../controllers/userController');

const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse request bodies
router.use(bodyParser.json());
router.use(express.json());

// Route to login
router.post('/login', userLogin);

// Route to get all users
router.get('/', getUsers);

// Route to get a user by email
router.get('/:email', getUserByEmail);

// Note: You can remove the ID route as you're switching to email-based identification
// router.get('/:id', getUserById);

// Route to create a new user
router.post('/signup', createUser);

// Route to update a user by email
// Update user route to use ID
router.put('/:id', updateUser);


// Route to get user profile by email
router.get('/profile', getUserByEmail);

// Route to delete a user by ID
// router.delete('/:id', deleteUser);

module.exports = router;
