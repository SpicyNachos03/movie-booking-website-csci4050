'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieCard.css';

const MovieCard = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      console.error('No movieId provided.');
      return;
    }
  
    setLoading(true);
    axios
      .get(`/api/movies/${movieId}`)
      .then((response) => {
        if (!response.data) {
          throw new Error('Movie not found');
        }
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error.message);
        setLoading(false);
      });
  }, [movieId]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return (
      <div className="movie-card-modal">
        <button className="close-btn" onClick={onClose}>Close</button>
        <p className="error">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="movie-card-modal">
      <button className="close-btn" onClick={onClose}>Close</button>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
    </div>
  );
};


export default MovieCard;
