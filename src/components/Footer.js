import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-gray-200 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400 py-4 mt-4"
      role="contentinfo"
    >
      © {new Date().getFullYear()} <span className="font-medium">Todo App</span>. All rights reserved.
    </footer>
  );
};

export default Footer;
