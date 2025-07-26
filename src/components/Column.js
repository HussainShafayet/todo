import React from 'react';
import TodoItem from './TodoItem';
import { FaEllipsisH, FaCopy } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';
import { useDroppable } from '@dnd-kit/core'
import AddTodoForm from './AddTodoForm';
import { AnimatePresence } from 'framer-motion';
import AnimatedTodoItem from './AnimatedTodoItem';
import { motion } from 'framer-motion';

const Column = ({ id, title, todos }) => {
  const { moveTodo, toggleForm, copyLastCardValues, showAddTodoForm } = useTodo();
   const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`flex flex-col w-full md:w-1/3 p-4 border rounded-lg m-2 shadow-md bg-white transition-all duration-200 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}>
      <Header title={title} />
      <div className="flex flex-col gap-2 mb-4">
        {title === 'New' && (
          <>
            {showAddTodoForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AddTodoForm />
              </motion.div>
            )}

          </>
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
      {(title === 'New') && (
        <Footer onAdd={() => toggleForm()} onCopy={() => copyLastCardValues(title)} />
      )}
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
    <button className="text-blue-500 text-sm hover:underline" onClick={onAdd}>
      + Add a card
    </button>
    <FaCopy className="text-gray-400 cursor-pointer" onClick={onCopy} />
  </div>
);

export default Column;
