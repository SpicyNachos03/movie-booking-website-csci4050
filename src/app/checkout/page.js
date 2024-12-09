'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import axios from 'axios';
import Cookies from 'js-cookie';
import './checkout.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter
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
  const [roomName, setRoomName] = useState('');

  // Fetch initial data
  useEffect(() => {
    const movieId = searchParams.get('movieId');
    const time = searchParams.get('showtime');
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');
    const showId = searchParams.get('showId');
    const userData = JSON.parse(Cookies.get('user'));
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
    const userData = JSON.parse(Cookies.get('user'));
  
    let cardNumber, expiry, cvv;
  
    if (card) {
      cardNumber = card.cardNumber;
      expiry = card.expirationDate;
      cvv = e.target.cvv.value;
  
      if (expiry !== card.expirationDate || cvv !== card.cvv) {
        alert('Invalid expiration date or CVV.');
        return;
      }
    } else {
      cardNumber = e.target.cardNumber.value;
      expiry = e.target.expiry.value;
      cvv = e.target.cvv.value;
  
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
    const bookingData = {
      userEmail: userData.data.email,
      selectedSeats,
      ticketTypes,
      showInformation: searchParams.get('showId'),
      orderTotal: finalTotal,
    };
  
    try {
      // Save booking information in the backend
      const response = await axios.post('http://localhost:8000/api/bookings', bookingData);
  
      // On success, redirect to confirmation with necessary data in query params
      setIsPaymentSuccess(true);
      const bookingId = response.data.bookingId; // Assuming bookingId is returned
      router.push(`/checkout/confirmation?bookingId=${bookingId}&movieTitle=${movieTitle}&showtime=${showtime}&selectedSeats=${JSON.stringify(selectedSeats)}&totalPrice=${finalTotal}&userEmail=${userData.data.email}`);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error processing payment. Please try again.');
    }
  };
  

  return (
    <div>
      <Header/>
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="movie-details">
        <h2>Movie: <span>{movieTitle || 'Loading...'}</span></h2>
        <p>Showtime: <span>{showtime || 'Not selected'}</span></p>
        <p>Room: <span>{roomName || 'Loading...'}</span></p>
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

          {/* Input fields for new card */}
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

          {/* Show expiry and CVV for saved cards */}
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
          <p>Redirecting to confirmation page...</p>
        </div>
      )}
      </div>
      <Footer/>
    </div>
  );
};

export default CheckoutPage;
