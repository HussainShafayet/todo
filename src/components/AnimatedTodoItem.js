import React from 'react';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

const AnimatedTodoItem = ({ todo }) => {
  return (
    <motion.div
      key={todo.id}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <TodoItem todo={todo} />
    </motion.div>
  );
};

export default AnimatedTodoItem;
