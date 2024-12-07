const mongoose = require('mongoose');

const paymentCardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nickname: {  // Allow users to give each card a nickname (optional)
    type: String,
    required: false,
  },
  expirationDate: {  // Optional: Expiration date for validation
    type: String,
    required: false,
  }
});

const PaymentCard = mongoose.model('PaymentCard', paymentCardSchema);
module.exports = PaymentCard;
