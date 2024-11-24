const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show;
