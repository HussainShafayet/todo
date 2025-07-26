import React, { useState, useEffect, useRef } from 'react';
import { useTodo } from '../context/TodoContext';
import { toast } from 'react-toastify';

const AddTodoForm = () => {
  const { formValues = { title: '', description: '' }, addTodo, toggleForm } = useTodo();

  const [title, setTitle] = useState(formValues.title);
  const [description, setDescription] = useState(formValues.description);
  const titleInputRef = useRef(null);

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
      status: 'New',
      attachments: 0,
      tags: '',
      dueDate: null,
    };

    addTodo(newTodo);
    toast.success('Todo added successfully!');
    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    toggleForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6 w-full max-w-6xl 
                 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md 
                 text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          id="title"
          type="text"
          ref={titleInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded 
                     border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100 
                     placeholder-gray-400 dark:placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded 
                     border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 
                     text-gray-900 dark:text-gray-100 
                     placeholder-gray-400 dark:placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="p-2 border border-gray-300 dark:border-gray-600 
                     bg-gray-100 dark:bg-gray-700 
                     text-gray-800 dark:text-gray-200 
                     rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
