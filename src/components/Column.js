import React from 'react';
import TodoItem from './TodoItem';
import { FaEllipsisH, FaCopy } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';

const Column = ({ title, todos }) => {
  const { moveTodo, handleFormShow, copyLastCardValues } = useTodo();
  return (
    <div className="flex flex-col w-full md:w-1/3 p-4 border border-gray-300 rounded-lg m-2 shadow-md bg-white">
      <Header title={title} />
      <div className="flex flex-col gap-2 mb-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
        ))}
      </div>
      <Footer onAdd={() => handleFormShow()} onCopy={() => copyLastCardValues(title)} />
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
