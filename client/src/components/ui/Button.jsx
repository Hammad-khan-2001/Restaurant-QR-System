import React from "react";

export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-yellow-400 text-black px-4 py-2 rounded-xl hover:bg-yellow-500 transition ${className}`}
    >
      {children}
    </button>
  );
}
