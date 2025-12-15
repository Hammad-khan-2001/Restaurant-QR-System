// components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-[#1f1a17] p-6 rounded-3xl shadow-2xl w-96 border border-[#3a2e24]">
        <h2 className="text-2xl font-bold text-[#fde9e9] mb-4">Confirm Action</h2>
        <p className="text-[#d1c0b0] mb-6">{message || "Are you sure you want to delete this item?"}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 text-[#f5f5f5] rounded-lg hover:bg-gray-600 hover:text-white transition duration-200 font-medium shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-200 font-medium shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

