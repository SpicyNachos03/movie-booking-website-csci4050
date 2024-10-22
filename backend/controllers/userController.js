const User = require('../models/userModel'); // Import User model

// Get all users
const getUsers = async (req, res) => {
  try {
    console.log('Attempting to fetch users...');
    const users = await User.find();
    res.status(200).json(users);
    console.log('Users fetched successfully:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get a single user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, promotions, status } = req.body;
  
  // Validate input
  if (!firstName || !lastName || !email || !phoneNumber || status === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    promotions,
    status
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { firstName, lastName, billingAddress, password, phoneNumber, promotions } = req.body;

  // Check for address limit
  const existingUser = await User.findById(req.params.id);
  if (existingUser && existingUser.billingAddress && billingAddress) {
    return res.status(400).json({ message: 'You cannot store more than one billing address.' });
  }

  // Check for payment card limit
  if (req.body.cards && req.body.cards.length > 4) {
    return res.status(400).json({ message: 'Max 4 cards allowed.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, billingAddress, password, phoneNumber, promotions },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = { getUsers, getUserByEmail, createUser, updateUser, deleteUser };