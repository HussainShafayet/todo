import React from 'react';
import {useTodo} from '../context/TodoContext';

const SearchBar = () => {
    const {searchTerm, setSearchTerm} = useTodo();
  return (
    <input
      type="search"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-6xl p-2 mb-4 border rounded-lg"
      aria-label="Search todos"
    />
  );
};

export default SearchBar;
