import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`bg-[#130d05] p-6 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={`text-white ${className}`}>{children}</div>;
}
