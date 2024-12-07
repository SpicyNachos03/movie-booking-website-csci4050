const express = require('express');
const { getSavedCards, addCard, deleteCard } = require('../controllers/paymentCardController'); // Assuming correct paths
const router = express.Router();

// Route to get all saved cards for a user
router.get('/saved', getSavedCards);

// Route to add a new card
router.post('/add', addCard);

// Route to delete a saved card
router.delete('/delete/:cardId', deleteCard);

module.exports = router;
