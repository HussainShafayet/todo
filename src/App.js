import React, { useState } from 'react';
import './App.css';
import Column from './components/Column';
import AddTodoForm from './components/AddTodoForm';

const App = () => {
  const initialTodos = [
    { id: 1, title: "Admin Panel Test Cases", description: "Description for Admin Panel Test Cases", status: 'New', attachments: 1, tags: 8 },
    { id: 2, title: "Seller Panel Test Cases", description: "Description for Seller Panel Test Cases", status: 'New', attachments: 0, tags: 40 },
    { id: 3, title: "Sales Manager Panel", description: "Description for Sales Manager Panel", status: 'New', attachments: 1, tags: 41 },
    { id: 4, title: "Customer Support & Operations", description: "Description for Customer Support & Operations", status: 'New', attachments: 0, tags: 43 },
    { id: 5, title: "Shop Panel Test Cases", description: "Description for Shop Panel Test Cases", status: 'New', attachments: 1, tags: 13 },
    { id: 6, title: "Questions", description: "Description for Questions", status: 'Ongoing', attachments: 0, tags: 1115, dueDate: new Date(Date.now() + 86400000) } 
  ];

  const [todos, setTodos] = useState(initialTodos);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', description: '' });

  const addTodo = (title, description) => {
    const newTodo = { id: Date.now(), title, description, status: 'New' };
    setTodos([...todos, newTodo]);
    handleFormShow();
    setFormValues({ title: '', description: '' });
  };

  const copyLastCardValues = (title) => {
    let lastTodo = todos.filter(todo => todo.status === title);
    lastTodo = lastTodo[lastTodo.length-1];
    if (lastTodo) {
      setFormValues({ title: lastTodo.title, description: lastTodo.description });
    }else{
      setFormValues({ title: '', description: '' });
    }
    setShowAddTodoForm(true);
  };

  const moveTodo = (id, newStatus, dueDate = null) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status: newStatus, dueDate } : todo
    ));
  };

  const handleFormShow = (lastItem = null)=>{
    setShowAddTodoForm(!showAddTodoForm);

  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {showAddTodoForm && <AddTodoForm addTodo={addTodo} formValues={formValues} /> }
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        <Column title="New" todos={todos} moveTodo={moveTodo} handleFormShow={handleFormShow} copyLastCardValues={copyLastCardValues} />
        <Column title="Ongoing" todos={todos} moveTodo={moveTodo} handleFormShow={handleFormShow} copyLastCardValues={copyLastCardValues} />
        <Column title="Done" todos={todos} moveTodo={moveTodo} handleFormShow={handleFormShow} copyLastCardValues={copyLastCardValues}/>
      </div>
    </div>
  );
};

export default App;
