import React, { useState } from 'react';
import { FaEllipsisH, FaCopy, FaTrash } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';
import { useDroppable } from '@dnd-kit/core';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedTodoItem from './AnimatedTodoItem';
import { AddtodoForm } from '.';

const Column = ({ id: columnId, title, todos }) => {
  const {
    toggleForm,
    copyLastCardValues,
    showAddTodoForm,
    clearTodosInColumn,
  } = useTodo();

  const { setNodeRef, isOver } = useDroppable({ id: columnId });
  const isNewColumn = title === 'New';
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div
      ref={setNodeRef}
      className={`relative flex flex-col w-full md:w-1/3 p-4 border rounded-lg m-2 shadow-md
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        transition-all duration-200
        ${isOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-700'}`}
    >
      <Header title={title} onMenuToggle={toggleMenu} />

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute right-4 top-12 z-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-md p-2 w-48">
          <button
            onClick={() => {
              clearTodosInColumn(title);
              setShowMenu(false);
            }}
            className="w-full text-left text-sm px-2 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded flex items-center gap-2"
          >
            <FaTrash />
            Clear all todos
          </button>
        </div>
      )}

      {/* Todo list container */}
      <div className="flex flex-col gap-2 mb-4 overflow-y-auto"  style={{
    maxHeight: 'calc(90vh - 150px)'
  }}>
        {isNewColumn && showAddTodoForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AddtodoForm />
          </motion.div>
        )}

        {todos.length === 0 ? (
          <p className="text-gray-400 italic text-center mt-4">No todos found.</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <AnimatedTodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer controls */}
      {isNewColumn && (
        <Footer
          onAdd={toggleForm}
          onCopy={() => copyLastCardValues(title)}
        />
      )}
    </div>
  );
};

const Header = ({ title, onMenuToggle }) => (
  <div className="flex justify-between items-center mb-4 relative">
    <h2 className="text-lg font-bold">{title}</h2>
    <button onClick={onMenuToggle} className="p-1">
      <FaEllipsisH className="text-gray-400 hover:text-gray-600" />
    </button>
  </div>
);

const Footer = ({ onAdd, onCopy }) => (
  <div className="flex justify-between items-center">
    <button
      type="button"
      onClick={onAdd}
      className="text-blue-500 text-sm hover:underline"
    >
      + Add a card
    </button>
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy last card"
      className="text-gray-400 hover:text-gray-500"
    >
      <FaCopy className="cursor-pointer" />
    </button>
  </div>
);

export default Column;
