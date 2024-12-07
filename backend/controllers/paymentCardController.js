const PaymentCard = require('../models/paymentCard'); // Assuming correct path

// Get saved cards for a specific user
const getSavedCards = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming userId is available in request (from authentication middleware)
    const cards = await PaymentCard.find({ userId });
    res.status(200).json(cards); // Return all saved cards for this user
  } catch (err) {
    console.error('Error fetching saved cards:', err);
    res.status(500).json({ message: 'Error fetching saved cards' });
  }
};

// Add a new payment card (for example after the user enters their card details)
const addCard = async (req, res) => {
  try {
    const { cardNumber, address, nickname, expirationDate } = req.body;
    const userId = req.user.id; // Assuming userId is available in request

    const newCard = new PaymentCard({
      userId,
      cardNumber,
      address,
      nickname,
      expirationDate,
    });

    await newCard.save();
    res.status(201).json({ message: 'Card added successfully' });
  } catch (err) {
    console.error('Error adding card:', err);
    res.status(500).json({ message: 'Error adding card' });
  }
};

// Delete a saved card
const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id; // Assuming userId is available in request

    const deletedCard = await PaymentCard.findOneAndDelete({
      _id: cardId,
      userId,
    });

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).json({ message: 'Error deleting card' });
  }
};

module.exports = {
  getSavedCards,
  addCard,
  deleteCard,
};
