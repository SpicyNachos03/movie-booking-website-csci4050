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
