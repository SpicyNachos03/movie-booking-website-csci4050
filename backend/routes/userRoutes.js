const express = require('express');
const {
  getUsers,
  getUserByEmail,
  createUser,
  userLogin,
  updateUser
} = require('../controllers/userController');

const router = express.Router();
const bodyParser = require('body-parser');

// Middleware to parse request bodies
router.use(bodyParser.json());

//Route to login
router.post('/login', userLogin);

// Route to get all users
router.get('/', getUsers);

// Route to get a user by email
router.get('/:email', getUserByEmail);

// Route to create a new user
router.post('/signup', createUser);

// Route to update a user by ID
router.put('/:id', updateUser);

module.exports = router;
