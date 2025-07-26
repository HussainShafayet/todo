import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoBoard from "./components/TodoBoard";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => (
  <ThemeProvider>
    <TodoProvider>
      <Layout>
        <TodoBoard />
        <ToastContainer position="top-right" autoClose={2000} />
      </Layout>
    </TodoProvider>
  </ThemeProvider>
);

export default App;
