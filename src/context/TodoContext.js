import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import initialTodos from '../data/initialTodos';

const TodoContext = createContext();

const LOCAL_STORAGE_KEY = 'myapp_todos';
export const TodoProvider = ({ children }) => {
    // Load todos from localStorage if available, otherwise use initialTodos
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialTodos;
    } catch {
      return initialTodos;
    }
  });

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', description: '' });
    const [searchTerm, setSearchTerm] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos', error);
    }
  }, [todos]);

  const addTodo = useCallback((newTodo) => {
    setTodos(prev => [newTodo, ...prev]);
    setFormValues({ title: '', description: '' });
    setShowAddTodoForm(false);
  }, []);

  const updateTodo = useCallback((id, updatedFields) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const moveTodo = useCallback((id, newStatus, dueDate = null) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, status: newStatus, dueDate } : todo
      )
    );
  }, []);

  const toggleForm = useCallback(() => {
    setShowAddTodoForm(prev => !prev);
  }, []);

  const copyLastCardValues = useCallback((status) => {
    const lastTodo = [...todos].reverse().find(todo => todo.status === status);
    setFormValues({
      title: lastTodo?.title || '',
      description: lastTodo?.description || ''
    });
    setShowAddTodoForm(true);
  }, [todos]);

  // filteredTodos remains the same
   const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const value = useMemo(() => ({
    todos: filteredTodos,
    allTodos: todos,
    showAddTodoForm,
    formValues,
    addTodo,
    moveTodo,
    toggleForm,
    copyLastCardValues,
    setFormValues,
    removeTodo,
    searchTerm,
    setSearchTerm,
    updateTodo,
  }), [
    filteredTodos,
    todos,
    showAddTodoForm,
    formValues,
    addTodo,
    moveTodo,
    toggleForm,
    copyLastCardValues,
    setFormValues,
    removeTodo,
    searchTerm,
    setSearchTerm,
    updateTodo,
  ]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
