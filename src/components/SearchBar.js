'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className="w-full flex justify-center mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full max-w-4xl p-3 border border-gray-300 rounded-l-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button type="submit" className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
        Search
      </button>
    </form>
  );
}