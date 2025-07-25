import React from 'react';
import Column from './Column';
import AddTodoForm from './AddTodoForm';
import { useTodo } from '../context/TodoContext';

const TodoBoard = () => {
  const {
    todos,
    showAddTodoForm,
    formValues,
    addTodo,
    moveTodo,
    toggleForm,
    copyLastCardValues
  } = useTodo();

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {showAddTodoForm && (
        <AddTodoForm addTodo={addTodo} formValues={formValues} />
      )}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {['New', 'Ongoing', 'Done'].map(status => (
          <Column
            key={status}
            title={status}
            todos={todos.filter(todo => todo.status === status)}
            moveTodo={moveTodo}
            handleFormShow={toggleForm}
            copyLastCardValues={copyLastCardValues}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoBoard;
