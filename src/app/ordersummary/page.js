'use client'

import React from 'react';

const OrderSummary = ({ selectedSeats, total, onReturn, onDelete }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div>
        <p>
          <strong>Selected Seats:</strong> {selectedSeats.join(', ')}
        </p>
        <p>
          <strong>Total Price:</strong> ${total.toFixed(2)}
        </p>
      </div>
      <div className="action-buttons">
        <button onClick={onReturn}>Return to Seating Chart</button>
        <button onClick={onDelete}>Delete Selection</button>
      </div>
    </div>
  );
};

export default OrderSummary;
