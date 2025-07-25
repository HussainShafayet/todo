import React, { useState, useEffect, useRef } from 'react';
import { useTodo } from '../context/TodoContext';
import { toast } from 'react-toastify';

const AddTodoForm = () => {
  const { formValues = { title: '', description: '' }, addTodo } = useTodo();

  const [title, setTitle] = useState(formValues.title);
  const [description, setDescription] = useState(formValues.description);
  const titleInputRef = useRef(null);

  // Auto-focus on the title input
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) return;

    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      description: trimmedDescription,
      status: 'New', // always start in New column
      attachments: 0,
      tags: '',
      dueDate: null,
    };

    addTodo(newTodo);
    toast.success('Todo added successfully!');
     
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6 w-full max-w-6xl bg-white p-4 rounded-lg shadow-md"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          ref={titleInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="self-start px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
