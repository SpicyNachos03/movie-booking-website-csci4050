const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  billingAddress: { type: String }, // Add this field
  promotions: { type: Boolean, default: false },
  cards: { type: [String], validate: [val => val.length <= 4, 'Max 4 cards allowed'] }, // Limit 4 cards
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// const { Int32 } = require('mongodb');
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   type: {
//     type: Int32,
//     required: true,
//   },
//   firstname: {
//     type: String,
//     required: true,
//   },
//   lastname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phonenumber: {
//     type: Int32,
//     required: true,
//   },
//   promotions: {
//     type: Int32,
//     required: true,
//   },
//   active: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;

