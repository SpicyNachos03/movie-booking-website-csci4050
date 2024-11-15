'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieCard = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Movie ID:', movieId); // Check movieId value
    axios
      .get(`/api/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      });
  }, [movieId]);
  

  const handleShowTimeChange = (e) => {
    setSelectedShowTime(e.target.value);
  };

  const handleProceed = () => {
    if (selectedShowTime) {
      window.location.href = `/seating/${movieId}?showTime=${selectedShowTime}`;
    } else {
      alert('Please select a showing time!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="movie-card-modal">
      <button onClick={onClose} className="close-btn">Close</button>
      <img src={movie.trailerPicture} alt={`${movie.title} Poster`} />
      <h2>{movie.title}</h2>
      <p><strong>Category:</strong> {movie.category}</p>
      <p><strong>Cast:</strong> {movie.cast}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Producer:</strong> {movie.producer}</p>
      <p><strong>Synopsis:</strong> {movie.synopsis}</p>
      <p><strong>MPAA Rating:</strong> {movie.mpaaRating}</p>

      <label htmlFor="showTime">Select a Show Time:</label>
      <select id="showTime" value={selectedShowTime} onChange={handleShowTimeChange}>
        <option value="">Select...</option>
        {movie.showInformation.map((showTime, index) => (
          <option key={index} value={showTime}>{showTime}</option>
        ))}
      </select>

      <button onClick={handleProceed} className="proceed-btn">Proceed to Seat Selection</button>
    </div>
  );
};

export default MovieCard;