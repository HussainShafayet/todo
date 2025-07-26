import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center text-sm text-gray-600 py-4 mt-4">
      © {new Date().getFullYear()} My Todo App. All rights reserved.
    </footer>
  );
};

export default Footer;
