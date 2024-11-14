const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    bookingID: {
        type: bookingId,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    seatId: {
        type: String,
        required: true,
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;