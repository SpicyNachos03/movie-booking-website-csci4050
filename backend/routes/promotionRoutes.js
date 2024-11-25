const express = require('express');
const router = express.Router();
const { getPromotions, getPromotionById, createPromotion } = require('../controllers/promotionController');
const bodyParser = require('body-parser');


// Route to get all Promotions
router.get('/', getPromotions);

// Route to get Promotion by ID
router.get('/:id', getPromotionById);

// Route to create a new promotion
router.post('/', createPromotion);

module.exports = router;