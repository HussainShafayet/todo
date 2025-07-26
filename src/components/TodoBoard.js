import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {SearchBar, Column, TodoItem} from ".";

const TodoBoard = () => {
  const [activeTodo, setActiveTodo] = useState(null);
  const { todos, moveTodo, copyLastCardValues } = useTodo();

  const handleDragStart = (event) => {
    const { active } = event;
    const dragged = todos.find((todo) => todo.id === active.id);
    if (dragged) setActiveTodo(dragged);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveTodo(null);
      return;
    }

    const draggedTodoId = active.id;
    const newStatus = over.id;
    const draggedTodo = todos.find((todo) => todo.id === draggedTodoId);

    if (draggedTodo && draggedTodo.status !== newStatus) {
      moveTodo(draggedTodoId, newStatus, draggedTodo.dueDate);
    }

    setActiveTodo(null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="flex flex-col items-center p-4 min-h-screen 
                      bg-gray-100 text-gray-900 
                      dark:bg-gray-900 dark:text-white 
                      transition-colors duration-300">
        
        <SearchBar />

        <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
          {["New", "Ongoing", "Done"].map((status) => (
            <Column
              key={status}
              id={status}
              title={status}
              todos={todos.filter((todo) => todo.status === status)}
              copyLastCardValues={copyLastCardValues}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 200 }}>
        {activeTodo ? (
          <div className="opacity-80 pointer-events-none">
            <TodoItem todo={activeTodo} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TodoBoard;
