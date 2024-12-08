const mongoose = require('mongoose');
const { ShowSchema } = require('./showModel');

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
    bookingNumber: {
        type: String,
        required: true,
    },

    ticketArray: [ticketSchema],

    showInformation: ShowSchema,

    orderTotal: {
        type: Number,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;