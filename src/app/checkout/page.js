'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
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
  const [roomName, setRoomName] = useState(''); // New state for roomName

  // Fetch initial data
  useEffect(() => {
    const movieId = searchParams.get('movieId');
    const time = searchParams.get('showtime');
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');
    const showId = searchParams.get('showId'); // Get showId from searchParams
    const userData = JSON.parse(Cookies.get('user')); // Get user data from cookies
    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (time) setShowtime(time);

    // Fetch movie title
    if (movieId) {
      axios.get(`http://localhost:8000/api/movies/${movieId}`)
        .then((response) => setMovieTitle(response.data.title || 'Unknown Title'))
        .catch(() => setMovieTitle('Error fetching movie title'));
    }

    // Fetch promotions
    axios.get('http://localhost:8000/api/promotions')
      .then((response) => setPromotions(response.data))
      .catch((error) => console.error('Error fetching promotions:', error));

    // Fetch saved cards
    axios.get(`http://localhost:8000/api/users/${userData.data.email}`)
      .then((response) => setSavedCards(response.data.cards))
      .catch((error) => console.error('Error fetching saved payment cards:', error));

    // Fetch room name using showId
    if (showId) {
      axios.get(`http://localhost:8000/api/shows/show/${showId}`)
        .then((response) => setRoomName(response.data.roomName || 'Unknown Room'))
        .catch((error) => console.error('Error fetching room name:', error));
    }

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

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const card = selectedCardId ? savedCards.find((card) => card._id === selectedCardId) : null;
    const userData = JSON.parse(Cookies.get('user')); // Get user data from cookies

    let cardNumber, expiry, cvv;

    if (card) {
      // Compare with saved card data
      cardNumber = card.cardNumber;
      expiry = card.expirationDate;
      cvv = e.target.cvv.value; // Get CVV input from user

      // Check if expiration date and CVV match
      if (expiry !== card.expirationDate || cvv !== card.cvv) {
        alert('Invalid expiration date or CVV.');
        return;
      }
    } else {
      // Validate manually entered card details
      cardNumber = e.target.cardNumber.value;
      expiry = e.target.expiry.value;
      cvv = e.target.cvv.value;

      // Validate card number, expiry date, and CVV
      const cardNumberPattern = /^[0-9]{16}$/;
      const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvPattern = /^[0-9]{3}$/;

      if (!cardNumber.match(cardNumberPattern)) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }

      if (!expiry.match(expiryPattern)) {
        alert('Please enter a valid expiry date (MM/YY).');
        return;
      }

      if (!cvv.match(cvvPattern)) {
        alert('Please enter a valid 3-digit CVV.');
        return;
      }
    }

    // Payment is valid; proceed with booking

    // Prepare the booking information
    const bookingData = {
      userEmail: userData.data.email,
      selectedSeats,
      ticketTypes,
      showInformation: searchParams.get('showId'),
      orderTotal: finalTotal
    };

    // Save the booking information in the backend
    try {
      await axios.post('http://localhost:8000/api/bookings', bookingData);
      setIsPaymentSuccess(true); // Show success message
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="movie-details">
        <h2>Movie: <span>{movieTitle || 'Loading...'}</span></h2>
        <p>Showtime: <span>{showtime || 'Not selected'}</span></p>
        <p>Room: <span>{roomName || 'Loading...'}</span></p> {/* Display room name */}
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

          <h3>Apply Promotion</h3>
          <input
            type="text"
            id="promotion-code"
            placeholder="PROMO2024"
            value={promotionCode}
            onChange={(e) => setPromotionCode(e.target.value)}
          />
          <button type="button" onClick={handleApplyPromotion}>Apply Promotion</button>

          <h3>Payment Information</h3>

          <h4>Saved Payment Cards</h4>
          <label htmlFor="saved-card-select">Select Saved Card</label>
          <select
            id="saved-card-select"
            value={selectedCardId || ''}
            onChange={(e) => setSelectedCardId(e.target.value)}
          >
            <option value="">-- Select a Card --</option>
            {savedCards.map((card) => (
              <option key={card._id} value={card._id}>
                {card.nickname || `Card ending in ${card.cardNumber.slice(-4)}`}
              </option>
            ))}
          </select>

          {/* If no card is selected, show input fields for a new card */}
          {!selectedCardId && (
            <>
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
              <label htmlFor="expiry">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" required />
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" required />
            </>
          )}

          {/* Show expiry and CVV fields when a saved card is selected */}
          {selectedCardId && (
            <>
              <label htmlFor="expiry">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" required />
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" required />
            </>
          )}

          <button type="submit">Confirm Payment</button>

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
