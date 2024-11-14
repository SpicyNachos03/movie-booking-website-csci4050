const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    promotionRate: {
        type: Double,
        required: true,
    },
    promotionType: {
        type: String,
        required: true,
    },
});

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;