'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movieId'); // Get the movieId from the URL

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/movies/${movieId}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const movieData = await response.json();
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to load movie details. Please try again later.');
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.posterUrl} alt={movie.title} />
      <p>{movie.description}</p>
      {/* Display other movie details as needed */}
    </div>
  );
};

export default MovieDetails;
