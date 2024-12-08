'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import './manageMovies.css';

function ManageMovies() {
  const [movies, setMovies] = useState([]); // State to store movies
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/movies'); // Replace with your API endpoint
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err.message);
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header />
      <div className="manage-movies-container">
        <Link href="/admin/manageMovies/addMovie" className="text-white hover:text-lightCyan">
          Add New Movie
        </Link>
        <Link href="/admin/manageMovies/scheduleMovie" className="text-white hover:text-lightCyan">
          Schedule New Movie Showing
        </Link>
        <h1>Manage Movies</h1>

        {/* Render movie cards */}
        <div className="movie-cards-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie._id} className="movie-card-wrapper">
                <div className="movie-card">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="movie-card-poster"
                  />
                  <h3>{movie.title}</h3>
                  <p><strong>Category:</strong> {movie.category}</p>
                  <p><strong>Status:</strong> {movie.status}</p>
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Cast:</strong> {movie.cast}</p>
                  <p><strong>Producer:</strong> {movie.producer}</p>
                  <p><strong>Rating:</strong> {movie.mpaaRating}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No movies available. Add some movies to get started!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManageMovies;
