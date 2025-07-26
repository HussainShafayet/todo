import React from 'react';
import { useTodo } from '../context/TodoContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useTodo();

  return (
    <input
      type="search"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-6xl p-2 mb-4 border rounded-lg 
                 bg-white text-gray-900 placeholder-gray-400 
                 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 
                 dark:border-gray-600 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-300"
      aria-label="Search todos"
    />
  );
};

export default SearchBar;
