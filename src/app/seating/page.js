'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer'
import axios from 'axios';
import './seating.css';

const SeatingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [showtime, setShowtime] = useState('');
  const [movieTitle, setMovieTitle] = useState('Loading...');
  const [seats, setSeats] = useState([]);
  const [showId, setShowId] = useState('');

  // Extract parameters from search query
  useEffect(() => {
    const seatsParam = searchParams.get('selectedSeats');
    const ticketsParam = searchParams.get('ticketTypes');
    const movieParam = searchParams.get('movieId');
    const timeParam = searchParams.get('showtime');

    if (seatsParam) setSelectedSeats(JSON.parse(seatsParam));
    if (ticketsParam) setTicketTypes(JSON.parse(ticketsParam));
    if (movieParam) setMovieId(movieParam);
    if (timeParam) setShowtime(timeParam);
  }, [searchParams]);

  // Fetch movie title using movieId
  useEffect(() => {
    if (movieId) {
      const fullUrl = `http://localhost:8000/api/movies/${movieId}`;
      axios.get(fullUrl)
        .then((response) => {
          setMovieTitle(response.data.title || 'Unknown Title');
        })
        .catch((error) => {
          console.error('Error fetching movie title:', error.response?.data || error.message || error);
          setMovieTitle('Error fetching movie title');
        });
    }
  }, [movieId]);

  // Fetch seat availability from the backend
  useEffect(() => {
    const showIdParam = searchParams.get('showId');
    if (showIdParam) {
      setShowId(showIdParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (showId) {
      const fullUrl = `http://localhost:8000/api/shows/show/${showId}`;
      axios.get(fullUrl)
        .then((response) => {
          console.log('Response data:', response.data);
          if (response.data && response.data.seatArray) {
            setSeats(response.data.seatArray);  // Assuming seatArray is part of the response
          }
        })
        .catch((error) => {
          console.error('Error fetching seat data:', error.response?.data || error.message || error);
        });
    }
  }, [showId]);

  // Handle seat selection
  const handleSeatSelect = (seatName) => {
    setSelectedSeats((prevState) =>
      prevState.includes(seatName)
        ? prevState.filter((item) => item !== seatName)
        : [...prevState, seatName]
    );
  };

  // Handle next button click to navigate to order summary
  const handleNext = () => {
    const queryParams = new URLSearchParams({
      showId,
      movieId,
      showtime,
      selectedSeats: JSON.stringify(selectedSeats),
      ticketTypes: JSON.stringify(ticketTypes),
    }).toString();

    router.push(`/ordersummary?${queryParams}`);
  };

  // Ticket prices for each type
  const ticketPrices = {
    Adult: 10,
    Child: 7,
    Senior: 8,
  };

  return (
    <div>
      <Header></Header>
      <div className="seating-page">
        <h1>Select Seats for {movieTitle}</h1>
        <p>Showtime: {showtime || 'Not Selected'}</p>

        {/* Seat Selection */}
        {/* Seat Selection */}
  <div className="seating-chart">
    {seats.length === 0 ? (
      <p>No seats available for this showtime.</p>
    ) : (
      // Group seats into rows of 10
      seats.reduce((rows, seat, index) => {
        const rowIndex = Math.floor(index / 10);
        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push(seat);
        return rows;
      }, []).map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
          {row.map((seat) => (
            <div
              key={seat.seatName}
              className={`seat ${
                selectedSeats.includes(seat.seatName) ? 'selected' : ''
              } ${!seat.seatAvailability ? 'unavailable' : ''}`}
              onClick={() =>
                seat.seatAvailability && handleSeatSelect(seat.seatName)
              }
            >
              {seat.seatName}
            </div>
          ))}
        </div>
      ))
    )}
  </div>


        {/* Ticket Types */}
        {selectedSeats.map((seat, index) => (
          <div key={seat} className="ticket-type">
            <label htmlFor={`ticket-type-${seat}`}>Ticket Type for {seat}:</label>
            <div className="ticket-dropdown">
              <select
                id={`ticket-type-${seat}`}
                value={ticketTypes[index] || ''}
                onChange={(e) => {
                  const updatedTypes = [...ticketTypes];
                  updatedTypes[index] = e.target.value;
                  setTicketTypes(updatedTypes);
                }}
              >
                <option value="">Select Ticket Type</option>
                <option value="Adult">Adult</option>
                <option value="Child">Child</option>
                <option value="Senior">Senior</option>
              </select>
              {ticketTypes[index] && (
                <span className="ticket-price">
                  ${ticketPrices[ticketTypes[index]]}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Next Button */}
        <button onClick={handleNext} disabled={!selectedSeats.length}>
          Next
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SeatingPage;
