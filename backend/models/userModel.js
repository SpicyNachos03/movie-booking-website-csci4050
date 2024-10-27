const mongoose = require('mongoose');

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
    unique: true 
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
    type: String 
  },
  promotions: { 
    type: Boolean, 
    required: true
  },
  cards: { 
    type: [String], 
    validate: [val => val.length <= 4, 'Max 4 cards allowed'] // Limit to 4 cards
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'inactive', 
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