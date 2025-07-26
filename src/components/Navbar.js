import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center"
      role="navigation"
      aria-label="Main navigation"
    >
      <h1 className="text-xl font-bold tracking-wide">📝 Todo App</h1>

      <button
        onClick={toggleTheme}
        className="text-xl p-2 rounded hover:bg-blue-500 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
