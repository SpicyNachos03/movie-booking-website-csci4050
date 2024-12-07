'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import './checkout.css';

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  const [promotionCode, setPromotionCode] = useState('');
  const [basePrice, setBasePrice] = useState(10.00);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [showtime, setShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const movieId = searchParams.get('movieId');
    const time = searchParams.get('showtime');
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (time) setShowtime(time);

    if (movieId) {
      axios.get(`http://localhost:8000/api/movies/${movieId}`)
        .then((response) => setMovieTitle(response.data.title || 'Unknown Title'))
        .catch(() => setMovieTitle('Error fetching movie title'));
    }

    axios.get('http://localhost:8000/api/promotions')
      .then((response) => setPromotions(response.data))
      .catch((error) => console.error('Error fetching promotions:', error));

    axios.get('http://localhost:8000/api/paymentCards/saved')
      .then((response) => setSavedCards(response.data))
      .catch((error) => console.error('Error fetching saved payment cards:', error));
  }, [searchParams]);

  // Calculate the total price based on ticket types
  const calculateTotalPrice = () => {
    let total = 0;
    ticketTypes.forEach((type) => {
      switch (type) {
        case 'Adult':
          total += 10;
          break;
        case 'Child':
          total += 7;
          break;
        case 'Senior':
          total += 8;
          break;
        default:
          total += basePrice;
      }
    });
    return total;
  };

  // Apply promotion and calculate discount
  const handleApplyPromotion = () => {
    const promotion = promotions.find((promo) => promo.promotionName === promotionCode);
    const total = calculateTotalPrice();

    if (promotion) {
      const discountAmount = (total * promotion.promotionRate) / 100;
      const finalPrice = total - discountAmount;

      setDiscount(discountAmount.toFixed(2));
      setFinalTotal(finalPrice.toFixed(2));
      alert(`Promotion applied! ${promotion.promotionRate}% discount.`);
    } else {
      setDiscount(0);
      setFinalTotal(total.toFixed(2));
      alert('Invalid promotion code.');
    }
  };

  // Update total price and final total when ticket types or discount change
  useEffect(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total.toFixed(2));
    setFinalTotal((total - discount).toFixed(2));
  }, [ticketTypes, discount]);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    const card = selectedCardId ? savedCards.find((card) => card._id === selectedCardId) : null;

    const cardNumber = card ? card.cardNumber : e.target.cardNumber.value;
    const expiry = card ? card.expirationDate : e.target.expiry.value;
    const cvv = card ? '***' : e.target.cvv.value;

    if (!cardNumber || !expiry || !cvv) {
      alert('Please complete the payment details.');
      return;
    }

    setIsPaymentSuccess(true);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="movie-details">
        <h2>Movie: <span>{movieTitle || 'Loading...'}</span></h2>
        <p>Showtime: <span>{showtime || 'Not selected'}</span></p>
        <p>Seats: <span>{selectedSeats.join(', ') || 'None selected'}</span></p>
        <p>Total Price: $<span>{totalPrice}</span></p>
        {promotionCode && (
          <>
            <p>
              Discount: <span className="discount-text">- ${discount}</span>
            </p>
            <p>
              Final Total: $<span>{finalTotal}</span>
            </p>
          </>
        )}
      </div>

      {!isPaymentSuccess ? (
        <form className="payment-form" onSubmit={handleSubmitPayment}>
          <h3>Payment Information</h3>

          <h4>Saved Payment Cards</h4>
          {savedCards.map((card) => (
            <div key={card._id} className="saved-card">
              <input
                type="radio"
                id={`card-${card._id}`}
                name="saved-card"
                value={card._id}
                checked={selectedCardId === card._id}
                onChange={() => setSelectedCardId(card._id)}
              />
              <label htmlFor={`card-${card._id}`}>
                {card.nickname || `Card ending in ${card.cardNumber.slice(-4)}`}
              </label>
            </div>
          ))}

          {!selectedCardId && (
            <>
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required />
              <label htmlFor="expiry">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" required />
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" required />
            </>
          )}

          <button type="submit">Confirm Payment</button>

          <h3>Apply Promotion</h3>
          <input
            type="text"
            id="promotion-code"
            placeholder="PROMO2024"
            value={promotionCode}
            onChange={(e) => setPromotionCode(e.target.value)}
          />
          <button type="button" onClick={handleApplyPromotion}>Apply Promotion</button>

          <div className="save-payment">
            <label htmlFor="save-payment-info">
              <input
                type="checkbox"
                id="save-payment-info"
                checked={isPaymentSaved}
                onChange={() => setIsPaymentSaved(!isPaymentSaved)}
              />
              Save Payment Information
            </label>
          </div>
        </form>
      ) : (
        <div id="success-message">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase. Enjoy your movie!</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
