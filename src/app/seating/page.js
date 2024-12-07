'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './seating.css';

const SeatingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [showtime, setShowtime] = useState('');
  const [movieTitle, setMovieTitle] = useState('Loading...'); // Default title

  // Log extracted parameters to check if movieId is correctly extracted
  useEffect(() => {
    const seats = searchParams.get('selectedSeats');
    const tickets = searchParams.get('ticketTypes');
    const movie = searchParams.get('movieId');
    const time = searchParams.get('showtime');

    console.log('Extracted movieId:', movie);  // Log movieId to debug

    if (seats) setSelectedSeats(JSON.parse(seats));
    if (tickets) setTicketTypes(JSON.parse(tickets));
    if (movie) setMovieId(movie);
    if (time) setShowtime(time);

    // Debugging: log the current state of movieId
    console.log('Current movieId state:', movieId);
  }, [searchParams]);

  // Fetch movie title using the movieId
  useEffect(() => {
    if (movieId) {
      const fullUrl = `http://localhost:8000/api/movies/${movieId}`;  // Full URL to the movie endpoint
      console.log(`Fetching movie with ID: ${movieId} from ${fullUrl}`);
      
      axios.get(fullUrl)
        .then((response) => {
          console.log('Movie data:', response.data);
          setMovieTitle(response.data.title || 'Unknown Title');
        })
        .catch((error) => {
          console.error('Error fetching movie title:', error.response ? error.response.data : error.message);
          setMovieTitle('Error fetching movie title');
        });
    }
  }, [movieId]);
  

  const handleSeatSelect = (seat) => {
    setSelectedSeats((prevState) =>
      prevState.includes(seat)
        ? prevState.filter((item) => item !== seat) // Deselect seat
        : [...prevState, seat] // Select seat
    );
  };

  const handleNext = () => {
    const queryParams = new URLSearchParams({
      movieId,
      showtime,
      selectedSeats: JSON.stringify(selectedSeats),
      ticketTypes: JSON.stringify(ticketTypes),
    }).toString();

    router.push(`/ordersummary?${queryParams}`);
  };

  // Generate row letters (A-F) dynamically
  const rowLetters = Array.from({ length: 6 }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // 65 is the ASCII code for 'A'

  return (
    <div className="seating-page">
      <h1>Select Seats for {movieTitle}</h1> {/* Display movie title */}
      <p>Showtime: {showtime || 'Not Selected'}</p>

      {/* Seat Selection */}
      <div className="seating-chart">
        {rowLetters.map((rowLetter) => (
          <div className="row" key={rowLetter}>
            {Array.from({ length: 10 }).map((_, seatIndex) => {
              const seatId = `${rowLetter}${seatIndex + 1}`; // Format: A1, B2
              return (
                <div
                  key={seatId}
                  className={`seat ${
                    selectedSeats.includes(seatId) ? 'selected' : ''
                  }`}
                  onClick={() => handleSeatSelect(seatId)}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Ticket Types */}
      {selectedSeats.map((seat, index) => (
        <div key={seat} className="ticket-type">
          <label htmlFor={`ticket-type-${seat}`}>Ticket Type for {seat}:</label>
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
        </div>
      ))}

      <button onClick={handleNext} disabled={!selectedSeats.length}>
        Next
      </button>
    </div>
  );
};

export default SeatingPage;
