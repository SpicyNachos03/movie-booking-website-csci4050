const mongoose = require('mongoose');

const paymentCardSchema = new mongoose.Schema({
  cardNumber: {
      type: String,
      required: true,
  },
  expiration: {
      type: String,
      required: true,
  },
  cvv: {
      type: String,
      required: true,
  },
  lastFourDigits: {
      type: String,
      required: true,
  }
})

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true, 
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  billingAddress: { 
    type: String,
    required: true //(WILL BE ADDED SOON)
  },
  promotions: { 
    type: Boolean, 
    required: true
  },
  cards: { 
    type: [paymentCardSchema], 
  },
  status: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    default: '1', 
    required: true 
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;