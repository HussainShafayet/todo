import React, { useState, useEffect, useRef } from 'react';
import { useTodo } from '../context/TodoContext';

const AddTodoForm = () => {
    const {
      formValues,
      addTodo,
    } = useTodo();
  
  const [title, setTitle] = useState(formValues.title);
  const [description, setDescription] = useState(formValues.description);
  const titleInputRef = useRef(null);


  useEffect(() => {
    setTitle(formValues.title);
    setDescription(formValues.description);
  }, [formValues]);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      description,
      status: 'New', 
      attachments: 0,
      tags: '',
      dueDate: null
    };

    addTodo(newTodo);

    // Clear form after submit
    setTitle('');
    setDescription('');
  };

  return (
    <form
      className="flex flex-col mb-6 w-full max-w-6xl"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mb-2 p-2 border rounded-lg"
        ref={titleInputRef}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="mb-2 p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
