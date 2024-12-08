const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatName: {
        type: String,
        required: true,
    },
    seatAvailability: {
        type: Boolean,
        default: true,
        required: true,
    }
});

const showSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String,
        required: true,
    },
    roomName: {
        type: String,
        required: true,
    },
    seatArray: [seatSchema]
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show;
