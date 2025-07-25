import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoBoard from './components/TodoBoard';
import { ToastContainer } from 'react-toastify';


const App = () => (
  <TodoProvider>
    <TodoBoard />
    <ToastContainer position="top-right" autoClose={2000} />
  </TodoProvider>
  
);

export default App;
