'use client';

import React, { useState } from 'react';
import './checkout.css'; // Ensure the CSS file is in the same directory or adjust the path

const CheckoutPage = () => {
  const [promotionCode, setPromotionCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(34.00); // Initial total price
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handleApplyPromotion = () => {
    if (promotionCode === 'PROMO2024') {
      const discountedPrice = totalPrice * 0.9; // Apply a 10% discount
      setTotalPrice(discountedPrice.toFixed(2));
      alert('Promotion applied! 10% discount.');
    } else {
      alert('Invalid promotion code.');
    }
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    // Perform validation (you can expand this with actual checks if needed)
    setIsPaymentSuccess(true);
  };

  const toggleSavePayment = () => {
    setIsPaymentSaved(!isPaymentSaved);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Movie Details Section */}
      <div className="movie-details">
        <h2>Movie: <span>Interstellar</span></h2>
        <label htmlFor="show-time">Select Show Time</label>
        <select id="show-time" defaultValue="12:00 PM">
          <option value="12:00 PM">12:00 PM</option>
          {/* Add more times if needed */}
        </select>

        <p>Seats: <span>A1, A2, A3</span></p>
        <p>Total Price: $<span>{totalPrice}</span></p>
      </div>

      {!isPaymentSuccess ? (
        <form className="payment-form" onSubmit={handleSubmitPayment}>
          <h3>Payment Information</h3>

          <label htmlFor="name">Name on Card</label>
          <input type="text" id="name" placeholder="John Doe" required />

          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required />

          <label htmlFor="expiry">Expiry Date</label>
          <input type="text" id="expiry" placeholder="MM/YY" required />

          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="123" required />

          <button type="submit">Confirm Payment</button>

          {/* Apply Promotion Section */}
          <h3>Apply Promotion</h3>
          <label htmlFor="promotion-code">Enter Promotion Code</label>
          <input
            type="text"
            id="promotion-code"
            placeholder="PROMO2024"
            value={promotionCode}
            onChange={(e) => setPromotionCode(e.target.value)}
          />
          <button type="button" onClick={handleApplyPromotion}>
            Apply Promotion
          </button>

          {/* Save Payment Information */}
          <div className="save-payment">
            <label htmlFor="save-payment-info">
              <input
                type="checkbox"
                id="save-payment-info"
                checked={isPaymentSaved}
                onChange={toggleSavePayment}
              />
              Save Payment Information
            </label>
          </div>
        </form>
      ) : (
        <div className="success-message">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase. Enjoy the movie!</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
