const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: {
    type: Int32,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Int32,
    required: true,
  },
  promotions: {
    type: Int32,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;