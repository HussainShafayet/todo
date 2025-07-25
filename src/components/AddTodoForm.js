import React, { useState, useEffect, useRef } from 'react';
import { useTodo } from '../context/TodoContext';

const AddTodoForm = () => {
  const { formValues = { title: '', description: '' }, addTodo } = useTodo();

  const [title, setTitle] = useState(formValues.title);
  const [description, setDescription] = useState(formValues.description);
  const titleInputRef = useRef(null);

  // Auto-focus on title input
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title: title.trim(),
      description: description.trim(),
      status: 'New',
      attachments: 0,
      tags: '',
      dueDate: null,
      id: Date.now()
    };

    addTodo(newTodo);

    // Clear inputs after submit
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mb-6 w-full max-w-6xl"
    >
      <input
        type="text"
        ref={titleInputRef}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mb-2 p-2 border rounded-lg"
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
