'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './confirmation.css';

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get('bookingId');
  const movieTitle = searchParams.get('movieTitle');
  const showtime = searchParams.get('showtime');
  const seats = searchParams.get('selectedSeats');
  const totalPrice = parseFloat(searchParams.get('totalPrice')) || 0.00;  // Parse totalPrice
  const userEmail = searchParams.get('userEmail');

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <div className="confirmation-container">
      <h1>Booking Confirmation</h1>
      <div className="confirmation-details">
        <p><strong>Booking ID:</strong> {bookingId || 'N/A'}</p>
        <p><strong>Movie:</strong> {movieTitle || 'N/A'}</p>
        <p><strong>Showtime:</strong> {showtime || 'N/A'}</p>
        <p><strong>Seats:</strong> {seats ? JSON.parse(seats).join(', ') : 'N/A'}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p> {/* Format totalPrice */}
      </div>
      <div className="confirmation-message">
        <p>
          Thank you for your purchase! A confirmation email has been sent to{' '}
          <strong>{userEmail || 'your email'}</strong>.
        </p>
        <p>We hope you enjoy your movie!</p>
      </div>
      <button className="return-home-button" onClick={handleReturnHome}>
        Return to Home Page
      </button>
    </div>
  );
};

export default ConfirmationPage;
