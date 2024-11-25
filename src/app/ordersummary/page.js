'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './ordersummary.css';

const OrderSummary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [showtime, setShowtime] = useState('');
  const [movieTitle, setMovieTitle] = useState(''); // State for movie title

  // Restore state from URL parameters
  useEffect(() => {
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');
    const movie = searchParams.get('movieId');
    const time = searchParams.get('showtime');

    console.log("Loaded Parameters:", { seats, tickets, movie, time });

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (movie) setMovieId(movie);
    if (time) setShowtime(time);
  }, [searchParams]);

  // Fetch movie title using the movieId
  useEffect(() => {
    if (movieId) {
      fetch(`/api/movies/${movieId}`) // Make an API request to fetch the movie title
        .then((response) => response.json())
        .then((data) => setMovieTitle(data.title)) // Set the movie title
        .catch((error) => console.error('Error fetching movie title:', error));
    }
  }, [movieId]);

  const handleReturnToSeating = () => {
    if (!movieId || !showtime) {
      alert("Movie ID or showtime is missing. Cannot return to seating.");
      return;
    }

    const queryParams = new URLSearchParams({
      selectedSeats: JSON.stringify(selectedSeats),
      ticketTypes: JSON.stringify(ticketTypes),
    }).toString();

    router.push(`/seating/${movieId}/${showtime}?${queryParams}`);
  };

  const handleContinueToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before continuing.");
      return;
    }

    const queryParams = new URLSearchParams({
      movieId,
      showtime,
      selectedSeats: JSON.stringify(selectedSeats),
      ticketTypes: JSON.stringify(ticketTypes),
    }).toString();

    router.push(`/payment?${queryParams}`);
  };

  const handleDeleteTicket = (seatToDelete) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.filter((seat) => seat !== seatToDelete)
    );
    setTicketTypes((prevTypes) => {
      const index = selectedSeats.indexOf(seatToDelete);
      return prevTypes.filter((_, i) => i !== index);
    });
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
        <button onClick={handleReturnToSeating} className="return-button">
          Return to Seating
        </button>
        <button onClick={handleContinueToPayment} className="continue-button">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
