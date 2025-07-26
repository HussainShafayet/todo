import React from "react";
import { TodoProvider } from "./context/TodoContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import {Layout, TodoBoard} from "./components";

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
