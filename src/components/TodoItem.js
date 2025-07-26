import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaAlignLeft, FaPaperclip, FaHashtag, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTodo } from "../context/TodoContext";
import { getNextStatusOptions, getStatusColor } from "../utills/statusUitls";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import ConfirmModal from "./ConfirmModal";
import { useTheme } from "../context/ThemeContext";

const TodoItem = ({ todo }) => {
  const { moveTodo, removeTodo, updateTodo } = useTodo();
  const { theme } = useTheme();
  const { id, title, description, status, attachments, tags, dueDate } = todo;

  const [showMenu, setShowMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dueDate ? new Date(dueDate) : new Date()
  );
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const { attributes, listeners, setNodeRef } = useDraggable({ id: todo.id });

  useEffect(() => {
    if (status === "Ongoing" && dueDate && new Date(dueDate) < new Date()) {
      alert(`⚠️ Task "${title}" is overdue!`);
    }
  }, [status, dueDate, title]);

  const toggleMenu = useCallback((e) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, handleClickOutside]);

  const handleStatusChange = useCallback(
    (newStatus) => {
      const updatedDate = newStatus === "Ongoing" ? selectedDate : null;
      moveTodo(id, newStatus, updatedDate);
      setShowMenu(false);
    },
    [id, moveTodo, selectedDate]
  );

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
      onContextMenu={toggleMenu}
      className={`relative p-4 mb-2 border-l-4 rounded-lg shadow-md cursor-grab transition-colors duration-300
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
        ${getStatusColor(status)}
      `}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo(todo.id, {
              title: editTitle,
              description: editDescription,
            });
            setIsEditing(false);
          }}
          className={`flex flex-col gap-2 p-2 rounded ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            className={`w-full p-2 rounded border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
            }`}
            placeholder="Edit title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className={`w-full p-2 rounded border mt-1 resize-none focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
            }`}
            placeholder="Edit description"
            rows={3}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded border ${
                theme === "dark"
                  ? "border-gray-500 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-200"
              } transition`}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div {...listeners} {...attributes}>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {description}
          </p>

          <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400 text-xs gap-2">
            <FaAlignLeft />
            <FaPaperclip />
            <span>{attachments}</span>
            <FaHashtag />
            <span>{tags}</span>
          </div>

          {status === "Ongoing" && dueDate && (
            <p className="text-xs text-red-500 mt-1">
              Due by: {new Date(dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
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

      <button
        onClick={() => setIsEditing(true)}
        className="text-blue-500 hover:text-blue-700"
        aria-label={`Edit todo: ${todo.title}`}
      >
        ✏️
      </button>
    </motion.div>
  );
};

const ContextMenu = React.forwardRef(
  ({ currentStatus, selectedDate, onDateChange, onSelectStatus }, ref) => {
    const options = getNextStatusOptions(currentStatus);

    return (
      <div
        ref={ref}
        className="absolute top-10 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
        text-gray-800 dark:text-gray-100 rounded-lg shadow-lg z-10 p-4 w-52 transition-colors duration-300"
      >
        {options.includes("Ongoing") && (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold dark:text-white">
              Select Due Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={onDateChange}
              className="w-full p-2 border rounded text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
            className="block w-full text-left p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Move to {option}
          </button>
        ))}
      </div>
    );
  }
);

export default TodoItem;
