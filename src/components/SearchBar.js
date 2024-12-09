'use client'
import { useState } from 'react';
import Image from "next/image";
import MovieCard from './MovieCard';
import axios from 'axios'; // Assuming you're using axios for API calls

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchType, setSearchType] = useState('title');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [shows, setShows] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle dropdown change
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  // Handle form submit (search)
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError(`Please provide a ${searchType} to search.`);
      return;
    }
    
    setLoading(true);
    setError('');
    const isSameShowtime = (showtime, query) => {
      return showtime === query; // Compare the datetime directly
    };
    
    if (searchType === 'showtime') {
      const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      if (!dateTimeRegex.test(query)) {
        setError('Invalid datetime format. Use YYYY-MM-DDTHH:mm.');
        setLoading(false);
        return;
      }
      
      try {
        const showResponse = await axios.get('http://localhost:8000/api/shows');
        setShows(showResponse.data); // Set shows from API
        
        // Filter shows based on showtime
        const matchedShows = showResponse.data.filter((show) => isSameShowtime(show.dateTime, query));
        
        // Fetch all movies from the database
        const movieResponse = await axios.get('http://localhost:8000/api/movies');
        const allMovies = movieResponse.data; // Assuming the movie data is an array

        // Filter the movies to match the ones in the matched shows
        const matchedMovies = allMovies.filter((movie) =>
          matchedShows.some((show) => show.movieName === movie.title)
        );
        
        if (matchedMovies.length > 0) {
          setMovies(matchedMovies);
          setError('');
        } else {
          setMovies([]);
          setError(`No movies found for showtime ${query}`);
        }
      } catch (error) {
        console.error('Error fetching shows or movies:', error.message);
        setError('Error fetching shows or movies.');
      } finally {
        setLoading(false);
      }
    } else { 
      // Handle standard search by title/category
      const apiUrl = `http://localhost:8000/api/movies/search?${searchType}=${query}`;
      console.log("Search API URL:", apiUrl); // Log the full URL for debugging
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (response.ok) {
          setMovies(data.data); // Set the movies returned from the API
          setError('');
        } else {
          setMovies([]);
          setError(data.message || `No movies found for ${searchType}`);
        }
      } catch (error) {
        setMovies([]);
        setError('Error fetching search results');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId); // Set selected movie ID to show MovieCard
  };

  const closeMovieCard = () => {
    setSelectedMovieId(null); // Clear the selected movie ID to close MovieCard
  };

  const placeholderText = searchType === 'showtime' 
    ? 'Search by showtime (ex: 2025-01-05T06:30)'  // Placeholder for showtimes
    : `Search by ${searchType}...`; // For title/category

  return (
    <div className="w-full flex flex-col items-center mb-6">
      <form onSubmit={handleSearch} className="flex w-full max-w-4xl">
        {/* Dropdown menu for selecting search type */}
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="p-3 border border-gray-300 rounded-l-lg bg-white text-black focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="showtime">Showtimes</option>
        </select>

        {/* Input field for search query */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholderText}
          className="flex-grow p-3 border-t border-b border-gray-300 text-black focus:outline-none focus:ring focus:ring-blue-500"
        />

        {/* Search button */}
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Error message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Movie results */}
      {movies.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id || movie.title}
              onClick={() => handleMovieClick(movie._id)}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              style={{ flex: '0 0 auto', width: '200px', height: 'auto' }}
            >
              {/* Check if posterUrl is valid before rendering the image */}
              {movie.posterUrl ? (
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  width={150}
                  height={225}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-auto bg-gray-400 flex justify-center items-center text-white">
                  No Image Available
                </div>
              )}
              <h3 className="text-xl mt-2">{movie.title}</h3>
              <p className="text-gray-600">{movie.category}</p>
            </div>
          ))}
        </div>
      )}
      {selectedMovieId && ( // Conditionally render MovieCard
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <MovieCard movieId={selectedMovieId} onClose={closeMovieCard} />
        </div>
      )}
    </div>
  );
}
