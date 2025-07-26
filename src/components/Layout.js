import React from "react";
import { Navbar, Footer } from ".";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Top Navigation */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-8">
          Organize Your Tasks with{" "}
          <span className="text-blue-600 dark:text-blue-400">Todo App</span>
        </h1>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
