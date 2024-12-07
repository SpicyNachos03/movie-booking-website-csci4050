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

const paymentCard = mongoose.model('Payment Card', paymentCardSchema);
module.exports = {
    paymentCardSchema,
    paymentCard
};