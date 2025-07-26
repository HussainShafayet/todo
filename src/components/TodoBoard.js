import React, { useState, useMemo } from 'react';
import { useTodo } from '../context/TodoContext';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SearchBar, Column, TodoItem } from '.';

const TodoBoard = () => {
  const [activeTodo, setActiveTodo] = useState(null);
  const { todos, moveTodo } = useTodo();

  const columns = useMemo(() => ['New', 'Ongoing', 'Done'], []);

  const handleDragStart = (event) => {
    const dragged = todos.find((todo) => todo.id === event.active.id);
    if (dragged) setActiveTodo(dragged);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveTodo(null);
      return;
    }

    const draggedTodo = todos.find((todo) => todo.id === active.id);
    const newStatus = over.id;

    if (draggedTodo && draggedTodo.status !== newStatus) {
      moveTodo(draggedTodo.id, newStatus, draggedTodo.dueDate);
    }

    setActiveTodo(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className="flex flex-col items-center p-4 min-h-screen
                   bg-gray-100 text-gray-900
                   dark:bg-gray-900 dark:text-white
                   transition-colors duration-300"
      >
        <SearchBar />

        <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl gap-4">
          {columns.map((status) => (
            <Column
              key={status}
              id={status}
              title={status}
              todos={todos.filter((todo) => todo.status === status)}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 200 }}>
        {activeTodo && (
          <div className="opacity-80 pointer-events-none">
            <TodoItem todo={activeTodo} isDragging />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default TodoBoard;
