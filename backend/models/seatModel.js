const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    showId: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;