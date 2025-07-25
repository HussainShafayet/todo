import React, { createContext, useContext, useState, useMemo } from 'react';
import initialTodos from '../data/initialTodos';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', description: '' });

  const addTodo = (newTodo) => {
    setTodos(prev => [...prev, newTodo]);
    setFormValues({ title: '', description: '' });
    setShowAddTodoForm(false);
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

  const value = useMemo(() => ({
    todos,
    showAddTodoForm,
    formValues,
    addTodo,
    moveTodo,
    toggleForm,
    copyLastCardValues,
    setFormValues
  }), [todos, showAddTodoForm, formValues]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
