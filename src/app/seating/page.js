'use client'

import React, { useState, useEffect } from 'react';
import './seating.css';
import OrderSummary from '../ordersummary/page';  // Ensure correct import
import { useRouter } from 'next/navigation';

const SeatingPage = ({ movieId, showtime }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const router = useRouter();

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prevState => {
      if (prevState.includes(seat)) {
        return prevState.filter(item => item !== seat); // Deselect if already selected
      } else {
        return [...prevState, seat]; // Select the seat
      }
    });
  };

  const handleReturnToSeating = () => {
    router.push(`/seating/${movieId}/${showtime}`);
  };

  const handleDeleteTicket = (seatToDelete) => {
    setSelectedSeats(prevState => prevState.filter(seat => seat !== seatToDelete));
  };

  return (
    <div className="seating-page">
      <h1>Select Seats for {movieId} at {showtime}</h1>
      
      {/* Seat Selection UI */}
      <div className="seating-chart">
        {/* Replace with actual seat selection logic */}
        <div className="seat" onClick={() => handleSeatSelect('A1')}>A1</div>
        <div className="seat" onClick={() => handleSeatSelect('A2')}>A2</div>
        {/* Add more seat elements as needed */}
      </div>

      {/* Display Order Summary if seats are selected */}
      {selectedSeats.length > 0 && (
        <OrderSummary
          selectedSeats={selectedSeats}
          onReturnToSeating={handleReturnToSeating}
          onDeleteTicket={handleDeleteTicket}
        />
      )}
    </div>
  );
};

export default SeatingPage;
