const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    promotionName: {
        type: String,
        required: true,
    },
    promotionRate: {
        type: Number,
        required: true,
    },
});

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;