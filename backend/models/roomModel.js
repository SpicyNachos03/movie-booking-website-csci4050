const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    numSeats: {
        type: Number,
        default: 25,
        required: true,
    },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;