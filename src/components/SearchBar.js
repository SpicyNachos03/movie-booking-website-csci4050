'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submit (search)
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please provide a title to search.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:8000/api/movies/search?title=${query}`);
      const data = await response.json();

      if (response.ok) {
        setMovies(data.data); // Set the movies returned from the API
        setError('');
      } else {
        setMovies([]);
        setError(data.message || 'No movies found');
      }
    } catch (error) {
      setMovies([]);
      setError('Error fetching search results');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie..."
          className="w-full max-w-4xl p-3 border border-gray-300 rounded-l-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {movies.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie._id} className="border p-4 rounded-lg">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl mt-2">{movie.title}</h3>
              <p className="text-gray-600">{movie.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
