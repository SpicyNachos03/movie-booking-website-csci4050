
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  promotions: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const User = mongoose.model('User', userSchema);
export default User;

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

