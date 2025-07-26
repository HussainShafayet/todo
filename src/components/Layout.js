import React from "react";
import {Footer, Navbar} from ".";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 text-center">
          Organize Your Tasks with{" "}
          <span className="text-blue-600 dark:text-blue-400">Todo App</span>
        </h1>

        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
