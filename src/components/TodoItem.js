import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaAlignLeft, FaPaperclip, FaHashtag, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTodo } from '../context/TodoContext';
import { getNextStatusOptions, getStatusColor } from '../utills/statusUitls';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import ConfirmModal from './ConfirmModal';

const TodoItem = ({ todo }) => {
  const { moveTodo, removeTodo } = useTodo();
  const { id, title, description, status, attachments, tags, dueDate } = todo;

  const [showMenu, setShowMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dueDate ? new Date(dueDate) : new Date());
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: todo.id,
  });

  useEffect(() => {
    if (status === 'Ongoing' && dueDate && new Date(dueDate) < new Date()) {
      alert(`⚠️ Task "${title}" is overdue!`);
    }
  }, [status, dueDate, title]);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    setShowMenu(prev => !prev);
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, handleClickOutside]);

  const handleStatusChange = useCallback((newStatus) => {
    const updatedDate = newStatus === 'Ongoing' ? selectedDate : null;
    moveTodo(id, newStatus, updatedDate);
    setShowMenu(false);
  }, [id, moveTodo, selectedDate]);

   

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    removeTodo(todo.id);
    closeModal();
  };

  return (
    <motion.div
     initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      ref={setNodeRef}
      className={`relative p-4 mb-2 border-l-4 rounded-lg bg-white shadow-md cursor-grab ${getStatusColor(status)}`}
       onContextMenu={toggleMenu}
    >
    <div {...listeners} {...attributes}>
  
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>

        <div className="flex items-center mt-2 text-gray-500 text-xs gap-2">
          <FaAlignLeft />
          <FaPaperclip />
          <span>{attachments}</span>
          <FaHashtag />
          <span>{tags}</span>
        </div>
      </div>

      {status === 'Ongoing' && dueDate && (
        <p className="text-xs text-red-500 mt-1">
          Due by: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {showMenu && (
        <ContextMenu
          ref={menuRef}
          currentStatus={status}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onSelectStatus={handleStatusChange}
        />
      )}

        <button
        onClick={openModal}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        aria-label={`Delete todo: ${todo.title}`}
        title={`Delete "${todo.title}"`}
        type="button"
      >
        <FaTrash />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${todo.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />
    </motion.div>
  );
};


const ContextMenu = React.forwardRef(({ currentStatus, selectedDate, onDateChange, onSelectStatus }, ref) => {
  const options = getNextStatusOptions(currentStatus);

  return (
    <div
      ref={ref}
      className="absolute top-10 left-0 bg-white border rounded-lg shadow-lg z-10 p-4 w-52 pointer-events-auto"
    >
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
          onClick={(e) => {
              e.stopPropagation();
              onSelectStatus(option);
            }}
          className="block w-full text-left p-2 text-sm hover:bg-gray-100 rounded"
        >
          Move to {option}
        </button>
      ))}
    </div>
  );
});


export default TodoItem;
