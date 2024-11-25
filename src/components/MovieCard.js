import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieCard.css';
import { useRouter } from 'next/navigation';

const MovieCard = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playTrailer, setPlayTrailer] = useState(false); // State to toggle trailer playback
  const router = useRouter();

  useEffect(() => {
    if (!movieId) {
      console.error('No movieId provided.');
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8000/api/movies/${movieId}`)
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

  const handlePlayTrailer = () => {
    setPlayTrailer(true); // Toggle trailer playback
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return (
      <div className="movie-card-modal">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <p className="error">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="movie-card-modal">
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      <div className="movie-card-content">
        <h2>{movie.title}</h2>
        <p><strong>Category:</strong> {movie.category}</p>
        <p><strong>Status:</strong> {movie.status}</p>
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Producer:</strong> {movie.producer}</p>
        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
        <p><strong>Reviews:</strong> {movie.reviews}</p>

        <div>
          <p><strong>Trailer:</strong></p>
          {playTrailer ? (
            <div className="trailer-player">
              <iframe
                width="560"
                height="315"
                src={movie.trailerVideo.replace("watch?v=", "embed/")}
                title="YouTube trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img
              src={movie.trailerPicture}
              alt="Trailer Picture"
              className="movie-trailer-picture"
              onClick={handlePlayTrailer}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>

        <p><strong>MPAA Rating:</strong> {movie.mpaaRating}</p>
        <div>
          <p><strong>Show Information:</strong></p>
          {movie.showInformation.map((showtime, index) => (
            <button
              key={index}
              onClick={() =>
                router.push(`/seating?movieId=${movieId}&showtime=${encodeURIComponent(showtime)}`)
              }
              className="showtime-btn"
            >
              {showtime}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

