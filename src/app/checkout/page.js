'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // To access query params
import axios from 'axios'; // Import axios
import './checkout.css'; // Ensure the CSS file is in the same directory or adjust the path

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const [promotionCode, setPromotionCode] = useState('');
  const [basePrice, setBasePrice] = useState(10.00); // Assuming base price per ticket
  const [totalPrice, setTotalPrice] = useState(34.00); // Initial total price (example for 2 seats)
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [showtime, setShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Extract data from URL parameters
  useEffect(() => {
    const movieId = searchParams.get('movieId');
    const time = searchParams.get('showtime');
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (time) setShowtime(time);

    // Fetch movie title using the movieId
    if (movieId) {
      const fullUrl = `http://localhost:8000/api/movies/${movieId}`;  // Full URL to the movie endpoint

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

    // Fetch saved payment cards for the user
    axios.get('http://localhost:8000/api/paymentCards/saved')  // Adjust API endpoint for fetching cards
      .then((response) => {
        setSavedCards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching saved payment cards:', error);
      });
  }, [searchParams]);

  // Handle Promotion Code
  const handleApplyPromotion = () => {
    const promotion = promotions.find((promo) => promo.promotionName === promotionCode);
    if (promotion) {
      const discountedPrice = calculateTotalPrice() * (1 - promotion.promotionRate / 100); // Apply discount based on the promotion rate
      setTotalPrice(discountedPrice.toFixed(2));
      alert(`Promotion applied! ${promotion.promotionRate}% discount.`);
    } else {
      alert('Invalid promotion code.');
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
  
    // Loop through the selected ticket types and calculate the total based on their price
    ticketTypes.forEach((ticketType) => {
      switch (ticketType) {
        case 'Adult':
          total += 10; // Price for Adult ticket
          break;
        case 'Child':
          total += 7; // Price for Child ticket
          break;
        case 'Senior':
          total += 8; // Price for Senior ticket
          break;
        default:
          total += basePrice; // Fallback for other types (if any)
          break;
      }
    });
  
    return total;
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();

    // Use selected saved card or entered card details
    const cardNumber = selectedCardId
      ? savedCards.find(card => card._id === selectedCardId).cardNumber
      : e.target.cardNumber.value;
    const expiry = selectedCardId
      ? savedCards.find(card => card._id === selectedCardId).expirationDate
      : e.target.expiry.value;
    const cvv = selectedCardId
      ? '***' // Placeholder for CVV if using saved card
      : e.target.cvv.value;

    if (!cardNumber || !expiry || !cvv) {
      alert('Please fill in all payment fields.');
      return;
    }

    // Simulate payment process
    setIsPaymentSuccess(true);
  };

  const toggleSavePayment = () => {
    setIsPaymentSaved(!isPaymentSaved);
  };

  const handleCardSelect = (cardId) => {
    setSelectedCardId(cardId);
  };

  useEffect(() => {
    // Update total price whenever selected seats or promotions change
    setTotalPrice(calculateTotalPrice());
  }, [selectedSeats, promotions]);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Movie Details Section */}
      <div className="movie-details">
        <h2>Movie: <span>{movieTitle || 'Loading...'}</span></h2> {/* Display movie title */}
        <label htmlFor="show-time">Select Show Time</label>
        <select id="show-time" value={showtime} disabled>
          <option value="12:00 PM">12:00 PM</option>
          {/* Add more times if needed */}
        </select>

        <p>Seats: <span>{selectedSeats.join(', ') || 'No seats selected'}</span></p>
        <p>Total Price: $<span>{totalPrice}</span></p>
      </div>

      {!isPaymentSuccess ? (
        <form className="payment-form" onSubmit={handleSubmitPayment}>
          <h3>Payment Information</h3>

          {/* Select Saved Card */}
          <h4>Saved Payment Cards</h4>
          {savedCards.map((card) => (
            <div key={card._id} className="saved-card">
              <input
                type="radio"
                id={`card-${card._id}`}
                name="saved-card"
                value={card._id}
                checked={selectedCardId === card._id}
                onChange={() => handleCardSelect(card._id)}
              />
              <label htmlFor={`card-${card._id}`}>{card.nickname || `Card ending in ${card.cardNumber.slice(-4)}`}</label>
            </div>
          ))}

          {/* New Card Input Fields */}
          {!selectedCardId && (
            <>
              <label htmlFor="name">Name on Card</label>
              <input type="text" id="name" placeholder="John Doe" required />

              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required />

              <label htmlFor="expiry">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" required />

              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" required />
            </>
          )}

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
