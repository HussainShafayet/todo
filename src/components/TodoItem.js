import React, { useState, useEffect, useCallback } from 'react';
import { FaAlignLeft, FaPaperclip, FaHashtag } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTodo } from '../context/TodoContext';
import { getNextStatusOptions, getStatusColor } from '../utills/statusUitls';

const TodoItem = ({ todo }) => {
  const { moveTodo } = useTodo();
  const { id, title, description, status, attachments, tags, dueDate } = todo;

  const [showMenu, setShowMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dueDate ? new Date(dueDate) : new Date());

  useEffect(() => {
    if (status === 'Ongoing' && dueDate && new Date(dueDate) < new Date()) {
      alert(`⚠️ Task "${title}" is overdue!`);
    }
  }, [status, dueDate, title]);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    setShowMenu(prev => !prev);
  }, []);

  const handleStatusChange = useCallback((newStatus) => {
    const updatedDate = newStatus === 'Ongoing' ? selectedDate : null;
    moveTodo(id, newStatus, updatedDate);
    setShowMenu(false);
  }, [id, moveTodo, selectedDate]);

  return (
    <div
      className={`relative p-4 mb-2 border-l-4 rounded-lg bg-white shadow-md ${getStatusColor(status)}`}
      onContextMenu={toggleMenu}
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="flex items-center mt-2 text-gray-500 text-xs gap-2">
        <FaAlignLeft />
        <FaPaperclip />
        <span>{attachments}</span>
        <FaHashtag />
        <span>{tags}</span>
      </div>

      {status === 'Ongoing' && dueDate && (
        <p className="text-xs text-red-500 mt-1">
          Due by: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {showMenu && (
        <ContextMenu
          currentStatus={status}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onSelectStatus={handleStatusChange}
        />
      )}
    </div>
  );
};

const ContextMenu = React.memo(({ currentStatus, selectedDate, onDateChange, onSelectStatus }) => {
  const options = getNextStatusOptions(currentStatus);

  return (
    <div className="absolute top-10 left-0 bg-white border rounded-lg shadow-lg z-10 p-4 w-52">
      {options.includes('Ongoing') && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Select Due Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            className="w-full p-2 border rounded text-sm"
            dateFormat="MM/dd/yyyy"
          />
        </div>
      )}

      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelectStatus(option)}
          className="block w-full text-left p-2 text-sm hover:bg-gray-100 rounded"
        >
          Move to {option}
        </button>
      ))}
    </div>
  );
});

export default TodoItem;
