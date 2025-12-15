import React from "react";

// Wrapper for the dialog
export function Dialog({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {children}
    </div>
  );
}

// Content inside dialog
export function DialogContent({ children, className }) {
  return (
    <div className={`bg-[#130d05] rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

// Header of dialog
export function DialogHeader({ children, className }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

// Title of dialog
export function DialogTitle({ children, className }) {
  return <h2 className={`text-2xl font-bold text-yellow-400 ${className}`}>{children}</h2>;
}
