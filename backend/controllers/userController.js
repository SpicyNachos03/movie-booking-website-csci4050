import User from '../models/User.js'; // Import User model

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, promotions, status } = req.body;

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
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, promotions, status } = req.body;
  
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
  