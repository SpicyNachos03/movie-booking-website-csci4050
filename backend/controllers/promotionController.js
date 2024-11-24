const Promotion = require('../models/promotionModel');

const getPromotions = async (req, res) => {

};

const getPromotionById = async (req, res) => {

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