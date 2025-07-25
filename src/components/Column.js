import React from 'react';
import TodoItem from './TodoItem';
import {FaEllipsisH, FaCopy } from 'react-icons/fa';

const Column = ({ title, todos, moveTodo, handleFormShow, copyLastCardValues }) => {
  const filteredTodos = todos.filter(todo => todo.status === title);

  return (
    <div className="flex flex-col w-full md:w-1/3 p-4 border border-gray-300 rounded-lg m-2 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <FaEllipsisH className="text-gray-400" />
      </div>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
      ))}
      <div className="flex justify-between items-center mb-4">
        <div className="text-blue-500 cursor-pointer"  onClick={() => handleFormShow()}>+ Add a card</div>
        <FaCopy className="text-gray-400 cursor-pointer" onClick={() => copyLastCardValues(title)} />
      </div>
      
    </div>
  );
};

export default Column;
