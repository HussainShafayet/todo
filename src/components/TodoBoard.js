import React, { useState } from 'react';
import Column from './Column';
import AddTodoForm from './AddTodoForm';

const TodoBoard = () => {
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
    setTodos(prev => [...prev, newTodo]);
    toggleForm();
    setFormValues({ title: '', description: '' });
  };

  const moveTodo = (id, newStatus, dueDate = null) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, status: newStatus, dueDate } : todo
      )
    );
  };

  const toggleForm = () => {
    setShowAddTodoForm(prev => !prev);
  };

  const copyLastCardValues = (status) => {
    const lastTodo = [...todos].reverse().find(todo => todo.status === status);
    setFormValues({
      title: lastTodo?.title || '',
      description: lastTodo?.description || ''
    });
    setShowAddTodoForm(true);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {showAddTodoForm && (
        <AddTodoForm addTodo={addTodo} formValues={formValues} />
      )}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {['New', 'Ongoing', 'Done'].map(status => (
          <Column
            key={status}
            title={status}
            todos={todos.filter(todo => todo.status === status)}
            moveTodo={moveTodo}
            handleFormShow={toggleForm}
            copyLastCardValues={copyLastCardValues}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoBoard;
