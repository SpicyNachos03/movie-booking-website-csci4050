'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ordersummary.css';

const OrderSummary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [showId, setShowId] = useState('');
  const [showtime, setShowtime] = useState('');
  const [movieTitle, setMovieTitle] = useState('Loading...'); // Default title

  // Restore state from URL parameters
  useEffect(() => {
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');
    const movie = searchParams.get('movieId');
    const show = searchParams.get('showId');
    const time = searchParams.get('showtime');

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (movie) setMovieId(movie);
    if (show) setShowId(show);
    if (time) setShowtime(time);
  }, [searchParams]);

  // Fetch movie title using the movieId (with full URL)
  useEffect(() => {
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
  }, [movieId]);

  const handleSeating = () => {
    if (!movieId || !showtime) {
      alert("Movie ID or showtime is missing. Cannot return to seating.");
      return;
    }
  
    // Pass relevant state as query parameters
    const queryParams = new URLSearchParams({
      movieId,
      showtime,
      showId,
      selectedSeats: JSON.stringify(selectedSeats),
      ticketTypes: JSON.stringify(ticketTypes),
    }).toString();
  
    router.push(`/seating?${queryParams}`);
  };
  
  
  

  const total = ticketTypes.reduce((sum, type) => {
    switch (type) {
      case 'Adult':
        return sum + 10;
      case 'Child':
        return sum + 7;
      case 'Senior':
        return sum + 8;
      default:
        return sum;
    }
  }, 0);

  const handleCheckout = () => {
    // Send the user to the checkout page with necessary details
    const queryParams = new URLSearchParams({
      showId,
      movieId,
      showtime,
      selectedSeats: JSON.stringify(selectedSeats),
      ticketTypes: JSON.stringify(ticketTypes),
    }).toString();

    // Navigate to the checkout page
    router.push(`/checkout?${queryParams}`);
  };

  return (
    <div className="order-summary">
      <h1>Order Summary</h1>
      <p>Movie: {movieTitle || 'Loading...'}</p> {/* Display movie title */}
      <p>Showtime: {showtime}</p>

      <div className="selected-seats">
        <h3>Selected Seats:</h3>
        {selectedSeats.map((seat, index) => (
          <div key={seat} className="seat-info">
            <span>
              {seat} - {ticketTypes[index] || 'No Type Selected'}
            </span>
            <button onClick={() => handleDeleteTicket(seat)}>Delete</button>
          </div>
        ))}
      </div>

      <p>
        <strong>Total Price:</strong> ${total.toFixed(2)}
      </p>

      <div className="action-buttons">
        <button onClick={handleSeating} className="return-button">
          Return to Seating
        </button>
        <button onClick={handleCheckout} className="continue-button">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
