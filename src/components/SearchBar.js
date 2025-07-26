import React from 'react';
import { useTodo } from '../context/TodoContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useTodo();

  return (
    <div className="w-full max-w-6xl mb-4">
      <label htmlFor="search-todos" className="sr-only">
        Search Todos
      </label>
      <input
        id="search-todos"
        type="search"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-lg 
                   bg-white text-gray-900 placeholder-gray-400 
                   dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 
                   dark:border-gray-600 transition-colors duration-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Search todos"
      />
    </div>
  );
};

export default SearchBar;
