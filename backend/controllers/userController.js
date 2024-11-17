const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail, sendProfileWasChangedEmail } = require('./emailController');
const { encrypt, decrypt } = require('./encryptController')
require('dotenv').config({ path: '../.env' });

//use the key in the .env file
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

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

    let unhashedPass = await decrypt(user.password, key);
    if (password === unhashedPass) {
      user.status = "active";
      await user.save();
      //within a login how do we also add a put request as well
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

const getUserById = async (req, res) => {
  try {
    console.log('Fetching user with ID:', req.params.id); // Log the ID

    const user = await User.findById(req.params.id); // Query by ID

    if (!user) {
      console.log('User not found for ID:', req.params.id); // Log if not found
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};


// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, billingAddress, promotions, status} = req.body;

  try {
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedCards = await bcrypt.hash(cards, 10);
    let hashPass = await encrypt(password, key)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPass,
      phoneNumber,
      billingAddress,
      promotions,
      status,
    });

    const savedUser = await newUser.save();
    await sendConfirmationEmail(savedUser.email);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};


// Update a user by ID
const updateUser = async (req, res) => {
  const { firstName, lastName, billingAddress, phoneNumber, cards } = req.body;

  // for (let i  = 0; i < cards.length; i++) {
  //     cards[i] = await encrypt(cards[i], key);
  // }

  try {
      const user = await User.findByIdAndUpdate(
          req.params.id, // Change from email to ID
          { firstName, lastName, billingAddress, phoneNumber, cards },
          { new: true, runValidators: true } // Return the updated document and run validators
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await sendProfileWasChangedEmail(user.email);

      res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Updates a user's password - Used in Forgot Pass & Edit Profile
const updatePassword = async (req, res) => {
  // Grabs from form input
  const { oldPassword, newPassword } = req.body

  try {
    // Grabs individual user
    console.log('Request received:', req.body, req.params);
    const user = await User.findOne({ email: req.params.email }); //finds a user
    
    if (!user) {
      console.log('User not found:', req.params.email);
      return res.status(404).json({ message: 'User not found'});
    }
    console.log('User found:', user.email);

    // Decrypt and compare the old password
    const unhashedPass = await decrypt(user.password, key);
    if (unhashedPass !== oldPassword) {
      console.log('Old password mismatch');
      return res.status(400).json({ message: 'Old password is incorrect'});
    }
    console.log('Passwords match, updating password...');


    //Encrypt the new password and update it
    const newHashedPass = await encrypt(newPassword, key);
    user.password = newHashedPass;

    // Save updated user
    await user.save()

    // Note: Add an else condition for a 400 error probably
    res.status(200).json({ message: 'Password updated successfully', user})
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};

// Updates a user's password - Used in Forgot Pass & Edit Profile
const forgotPassword = async (req, res) => {
  // Grabs from form input
  const { newPassword } = req.body

  try {
    // Grabs individual user
    const user = await User.findOne({ email: req.params.email }); //finds a user
    const filter = { user_id: user.id }

    // Checking if password is the same on the form & DB
    // let unhashedPass = await decrypt(user.password, key);
      let newPass = await encrypt(newPassword, key);
      const updateDoc = {
        $set: {
          password: newPass
        }
      }
      // Put's the newly hashed password as the new password
      const updatePass = await user.updateOne(filter, updateDoc)
    
    // Note: Add an else condition for a 400 error probably
    res.status(200).json({ message: 'Updated password successfully', user})
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(400).json({ message: 'Error updating password', error: error.message });
  }
};
  
  module.exports = {getUsers, userLogin, getUserByEmail, getUserById, createUser, updateUser, updatePassword, forgotPassword};