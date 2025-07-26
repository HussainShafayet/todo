import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  const handleSubmit = useCallback((e) => {
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
  }, [title, description, addTodo]);

  const handleCancel = useCallback(() => {
    toggleForm(false);
  }, [toggleForm]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300 text-gray-900 dark:text-gray-100"
    >
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          ref={titleInputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter task title"
          className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Enter task description"
          rows={4}
          className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Todo
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
