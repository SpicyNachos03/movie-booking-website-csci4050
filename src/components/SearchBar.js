'use client';

import { useState } from 'react';
import Image from "next/image";
import MovieCard from './MovieCard';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchType, setSearchType] = useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Track selected movie
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
  };
  
  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId); // Set selected movie ID to show MovieCard
  };

  const closeMovieCard = () => {
    setSelectedMovieId(null); // Clear the selected movie ID to close MovieCard
  };

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
        </select>

        {/* Input field for search query */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={`Search by ${searchType}...`}
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
            <div key={movie._id} 
            onClick={() => handleMovieClick(movie._id)} // Handle movie click
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            style={{ flex: '0 0 auto', width: '200px', height: 'auto' }}
          >
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={150}
              height={225}
              className="w-full h-auto"
            />
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
