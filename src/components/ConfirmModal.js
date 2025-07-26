import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

    // Close modal if user clicks on overlay
    const handleOverlayClick = () => {
        onCancel();
    };

    // Prevent overlay click from closing modal when clicking inside modal content
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 id="confirm-dialog-title" className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
