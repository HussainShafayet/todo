import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoBoard from './components/TodoBoard';


const App = () => (
  <TodoProvider>
    <TodoBoard />
  </TodoProvider>
);

export default App;
