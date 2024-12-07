'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // To access query params
import axios from 'axios'; // Import axios
import './checkout.css'; // Ensure the CSS file is in the same directory or adjust the path

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const [promotionCode, setPromotionCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(34.00); // Initial total price
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [showtime, setShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [promotions, setPromotions] = useState([]);
  
  // Extract data from URL parameters
  useEffect(() => {
    const movieId = searchParams.get('movieId');
    const time = searchParams.get('showtime');
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (time) setShowtime(time);

    // Fetch movie title using the movieId (with full URL)
    if (movieId) {
      const fullUrl = `http://localhost:8000/api/movies/${movieId}`;  // Full URL to the movie endpoint
      console.log(`Fetching movie with ID: ${movieId} from ${fullUrl}`);

      // Using axios to fetch movie title
      axios.get(fullUrl)
        .then((response) => {
          setMovieTitle(response.data.title || 'Unknown Title');
        })
        .catch((error) => {
          console.error('Error fetching movie title:', error);
          setMovieTitle('Error fetching movie title');
        });
    }

    // Fetch promotions
    axios.get('http://localhost:8000/api/promotions')  // Adjust to your promotions API endpoint
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching promotions:', error);
      });
  }, [searchParams]);

  // Handle Promotion Code
  const handleApplyPromotion = () => {
    const promotion = promotions.find((promo) => promo.promotionName === promotionCode);
    if (promotion) {
      const discountedPrice = totalPrice * (1 - promotion.promotionRate / 100); // Apply discount based on the promotion rate
      setTotalPrice(discountedPrice.toFixed(2));
      alert(`Promotion applied! ${promotion.promotionRate}% discount.`);
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
        <h2>Movie: <span>{movieTitle || 'Loading...'}</span></h2> {/* Display movie title */}
        <label htmlFor="show-time">Select Show Time</label>
        <select id="show-time" defaultValue={showtime}>
          <option value="12:00 PM">12:00 PM</option>
          {/* Add more times if needed */}
        </select>

        <p>Seats: <span>{selectedSeats.join(', ') || 'No seats selected'}</span></p>
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
