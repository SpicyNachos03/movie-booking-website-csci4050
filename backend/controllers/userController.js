const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


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

//login
const userLogin = async (req, res) => {
  console.log("Login request received", req.body);
  try {
    const { email, password } = req.body;
    
     // Validate input
     if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({ message: "An account is not associated with this email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);  
    if (isPasswordValid) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(400).json({ message: "The password is incorrect" });
    }
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "An error occurred" });
  }
};


// Get user by email
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
  const { firstName, lastName, email, phoneNumber, promotions, status, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      promotions,
      status,
      password: hashedPassword // Store the hashed password
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, promotions, status, password } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, email, phoneNumber, promotions, status },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };
  
  module.exports = {getUsers, userLogin, getUserByEmail, createUser, updateUser };