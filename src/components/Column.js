import React from 'react';
import { FaEllipsisH, FaCopy } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';
import { useDroppable } from '@dnd-kit/core';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedTodoItem from './AnimatedTodoItem';
import { AddtodoForm } from '.';

const Column = ({ id: columnId, title, todos }) => {
  const { toggleForm, copyLastCardValues, showAddTodoForm } = useTodo();
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  const isNewColumn = title === 'New';

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-full md:w-1/3 p-4 border rounded-lg m-2 shadow-md
                  bg-white dark:bg-gray-800 
                  text-gray-900 dark:text-gray-100 
                  transition-all duration-200
                  ${isOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-700'}`}
    >
      <Header title={title} />

      <div className="flex flex-col gap-2 mb-4">
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

      {isNewColumn && <Footer onAdd={toggleForm} onCopy={() => copyLastCardValues(title)} />}
    </div>
  );
};

const Header = ({ title }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-bold">{title}</h2>
    <FaEllipsisH className="text-gray-400" />
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
