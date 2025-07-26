import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoBoard from './components/TodoBoard';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';


const App = () => (
  <TodoProvider>
    <Layout>
      <TodoBoard />
    <ToastContainer position="top-right" autoClose={2000} />
    </Layout>
    
  </TodoProvider>
  
);

export default App;
