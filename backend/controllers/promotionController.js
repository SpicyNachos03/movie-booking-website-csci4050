const Promotion = require('../models/promotionModel');

const getPromotions = async (req, res) => {
    try {
        console.log('Attempting to fetch promotions...');
        const promotions = await Promotion.find();
        res.json(promotions);
        console.log('Promotions fetched successfully:', promotions);
      } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ message: 'Error fetching promotions', error: error.message });
      };
};

const getPromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findById(id);
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found.' });
        }
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching promotion', error: error.message });
    }
};

const createPromotion = async (req, res) => {
    const { promotionName, promotionRate } = req.body;
    
    const promotion = new Promotion({
        promotionName,
        promotionRate,
    });
    try {
        console.log("Here is the promotion: ", promotion);
        const savedPromotion = await promotion.save();

        console.log('Saved promotion:', savedPromotion);
        res.status(201).json(savedPromotion);
    } catch (error) {
        console.log("Error adding promotion ", error);
        res.status(400).json({message: error.message});
    };
};

module.exports = { getPromotions, getPromotionById, createPromotion };