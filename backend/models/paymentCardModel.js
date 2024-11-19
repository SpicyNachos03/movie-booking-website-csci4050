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
})

const paymentCard = mongoose.model('Payment Card', paymentCardSchema);
module.exports = paymentCard;