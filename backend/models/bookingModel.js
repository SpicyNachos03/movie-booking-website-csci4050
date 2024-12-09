const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    seatName: {
        type: String,
        required: true
    },
    ticketType: {
        type: String,
        enum: ['Adult', 'Child', 'Senior'],
        default: 'Adult',
        required: true
    }
});

const bookingSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    ticketArray: [ticketSchema],

    showInformation: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Show model
        ref: 'Show',
        required: true
    },

    orderTotal: {
        type: Number,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
