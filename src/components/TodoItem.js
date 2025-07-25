import React, { useState, useEffect } from 'react';
import {FaAlignLeft, FaPaperclip, FaHashtag } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const TodoItem = ({ todo, moveTodo }) => {
  const { id, title, description, status, attachments, tags, dueDate } = todo;
  const [showMenu, setShowMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dueDate ? new Date(dueDate) : new Date());

  useEffect(() => {
    if (status === 'Ongoing' && dueDate && new Date(dueDate) < new Date()) {
      alert(`Task "${title}" is overdue!`);
    }
  }, [status, dueDate, title]);

  const getNextStatusOptions = () => {
    if (status === 'New') return ['Ongoing', 'Done'];
    if (status === 'Ongoing') return ['New', 'Done'];
    if (status === 'Done') return ['New', 'Ongoing'];
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleMove = (newStatus) => {
    if (newStatus === 'Ongoing') {
      moveTodo(id, newStatus, selectedDate);
    } else {
      moveTodo(id, newStatus);
    }
    setShowMenu(false);
  };

  const getStatusColor = () => {
    if (status === 'New') return 'border-blue-500';
    if (status === 'Ongoing') return 'border-orange-500';
    if (status === 'Done') return 'border-green-500';
  };

  return (
    <div className={`relative p-4 mb-2 border-l-4 rounded-lg bg-white shadow-md ${getStatusColor()}`} onContextMenu={handleRightClick}> 
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="flex items-center mt-2 text-gray-500">
        <FaAlignLeft className="ml-2" />
        <FaPaperclip className="ml-2" />
        <span>{attachments}</span>
        <FaHashtag className="ml-2" />
        <span>{tags}</span>
      </div>
      {status === 'Ongoing' && <p className="text-xs text-red-500">Due by: {new Date(dueDate).toLocaleDateString()}</p>}
      {showMenu && (
        <div className="absolute top-0 left-0 mt-10 bg-white border rounded-lg shadow-lg z-10 p-4">
          {getNextStatusOptions().includes('Ongoing') && (
            <>
              <label className="block mb-2 text-sm font-bold text-gray-700">Select Due Date for OnGoing:</label>
              <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="mb-4 p-2 border rounded" />
            </>
          )}
          {getNextStatusOptions().map(option => (
            <div key={option} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleMove(option)}>
              Move to {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
