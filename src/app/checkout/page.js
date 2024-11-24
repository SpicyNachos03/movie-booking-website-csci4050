import React, { useState } from "react";
import "./checkout.css";

const CheckoutPage = ({ movie, selectedSeats, showtime, totalPrice, onPaymentSuccess }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [savePayment, setSavePayment] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleApplyPromo = () => {
    console.log(`Promo code applied: ${promoCode}`);
    // Apply promo logic here
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log("Payment information validated.");
    setSuccessMessage(true);
    if (onPaymentSuccess) onPaymentSuccess(); // Callback for handling further actions like navigation
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {/* Movie Details Section */}
      <div className="movie-details">
        <h2>Movie: <span id="movie-title">{movie}</span></h2>
        <label htmlFor="show-time">Select Show Time</label>
        <select id="show-time" value={showtime} disabled>
          <option>{showtime}</option>
        </select>
        <p>Seats: <span id="seats-selected">{selectedSeats.join(", ")}</span></p>
        <p>Total Price: $<span id="total-price">{totalPrice.toFixed(2)}</span></p>
      </div>

      {/* Payment Information Section */}
      <form className="payment-form" id="checkout-form" onSubmit={handlePayment}>
        <h3>Payment Information</h3>
        <label htmlFor="name">Name on Card</label>
        <input
          type="text"
          id="name"
          placeholder="John Doe"
          value={paymentInfo.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={paymentInfo.cardNumber}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="expiry">Expiry Date</label>
        <input
          type="text"
          id="expiry"
          placeholder="MM/YY"
          value={paymentInfo.expiry}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          placeholder="123"
          value={paymentInfo.cvv}
          onChange={handleInputChange}
          required
        />

        <button type="submit" id="checkout-button">Confirm Payment</button>

        {/* Apply Promotion Section */}
        <h3>Apply Promotion</h3>
        <label htmlFor="promotion-code">Enter Promotion Code</label>
        <input
          type="text"
          id="promotion-code"
          placeholder="PROMO2024"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button type="button" id="apply-promo-button" onClick={handleApplyPromo}>
          Apply Promotion
        </button>

        {/* Save Payment Information */}
        <div className="save-payment">
          <label htmlFor="save-payment-info">
            <input
              type="checkbox"
              id="save-payment-info"
              checked={savePayment}
              onChange={() => setSavePayment(!savePayment)}
            />
            Save Payment Information
          </label>
        </div>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div id="success-message">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase. Enjoy the movie!</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
