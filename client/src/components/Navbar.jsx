// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-[#7C4A2F] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 text-2xl font-bold">
            Qrovia
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-[#D9B08C] transition">
              Home
            </Link>
            <Link to="/menu" className="hover:text-[#D9B08C] transition">
              Menu
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-[#D9B08C] transition"
            >
              <FiShoppingCart /> Cart
            </Link>
            <Link to="/login" className="hover:text-[#D9B08C] transition">
              Login
            </Link>
            <Link
              to="/contact"
              className="bg-[#A67856] hover:bg-[#D9B08C] px-4 py-2 rounded transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setOpen(!open)}
              className="text-white hover:text-[#D9B08C] focus:outline-none"
            >
              {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100%-64px)] bg-[#7C4A2F] bg-opacity-95 z-40 flex flex-col items-center justify-start pt-4 transition-transform duration-300">
          <Link
            to="/"
            className="block px-6 py-4 text-xl font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full text-center"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block px-6 py-4 text-xl font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full text-center"
            onClick={() => setOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/cart"
            className=" px-6 py-4 flex items-center justify-center gap-2 text-xl font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full"
            onClick={() => setOpen(false)}
          >
            <FiShoppingCart className="text-2xl" /> Cart
          </Link>
          <Link
            to="/login"
            className="block px-6 py-4 text-xl font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full text-center"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/contact"
            className=" block px-6 py-4 text-xl font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full text-center"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
