const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    // seatArray: {
    //     type: [Seat],
    //     required: true,
    // },
    numSeats: {
        type: Number,
        required: false,
    },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;