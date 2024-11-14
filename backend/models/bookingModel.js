const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    bookingNumber: {
        type: String,
        required: true,
    },
    ticketNumbers: {
        type: [String],
        required: true,
    },
    movieId: {
        type: movieId,
        required: true,
    },
    showInformation: {
        type: String,
        required: true,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;