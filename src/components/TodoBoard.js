import React from "react";
import Column from "./Column";
import { useTodo } from "../context/TodoContext";
import { DndContext } from "@dnd-kit/core";

const TodoBoard = () => {
  const { todos, moveTodo, copyLastCardValues } = useTodo();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedTodoId = active.id;
    const newStatus = over.id;

    const draggedTodo = todos.find((todo) => todo.id === draggedTodoId);
    if (draggedTodo && draggedTodo.status !== newStatus) {
      moveTodo(draggedTodoId, newStatus, draggedTodo.dueDate);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
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
    </DndContext>
  );
};

export default TodoBoard;
