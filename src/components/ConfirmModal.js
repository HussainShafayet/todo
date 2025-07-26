import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({
  isOpen = false,
  onConfirm = () => {},
  onCancel = () => {},
  message = 'Are you sure?',
}) => {
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  }, [onCancel]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl text-gray-900 dark:text-gray-100"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <h2 id="confirm-dialog-title" className="text-lg font-semibold mb-3">
            Confirm
          </h2>
          <p id="confirm-dialog-description" className="mb-6 text-sm">
            {message}
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Cancel action"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Confirm deletion"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  message: PropTypes.string,
};

export default ConfirmModal;
