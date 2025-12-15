import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, Utensils, Table2, Wallet, Home } from "lucide-react";

export default function AdminPanel() {
  const baseClass = "flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a140a] transition";
  const activeClass = "bg-[#1a140a] text-yellow-400";

  return (
    <div className="flex min-h-screen bg-[#0a0600] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#130d05] p-6 hidden md:flex flex-col h-screen fixed top-0 left-0">
        <h1 className="text-3xl font-bold mb-10 text-yellow-400">Admin</h1>
        <nav className="flex flex-col gap-4 text-lg">
          <NavLink to="/admin" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
            <Home size={20} /> Overview
          </NavLink>
          <NavLink to="/admin/tables" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
            <Table2 size={20} /> Tables
          </NavLink>
          <NavLink to="/admin/menu" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
            <Utensils size={20} /> Menu
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
            <Menu size={20} /> Orders
          </NavLink>
          <NavLink to="/admin/payment" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
            <Wallet size={20} /> Payment
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}
