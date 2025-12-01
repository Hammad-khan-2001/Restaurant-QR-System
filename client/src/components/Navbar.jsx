import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false); // User dropdown
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setDropdown(false);
    setOpen(false);
  };

  return (
    <nav className="relative z-50 bg-black text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 text-3xl text-white/90 font-bold first-letter:text-[#D4AF37]">
            Scanbite
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className=" hover:text-[#8b3838] transition">Home</Link>
            <Link to="/menu" className="hover:text-[#8b3838] transition">Menu</Link>
            <Link to="/cart" className="flex items-center gap-1 hover:text-[#8b3838] transition">
              <FiShoppingCart /> Cart
            </Link>
            <Link to="/contact" className="hover:text-[#8b3838] transition">Contact</Link>

            {/* Conditional Login / Profile */}
            {!token ? (
              <Link
                to="/login"
                className="bg-amber-500 text-black hover:bg-[#c77e3f] active:scale-95 px-7 py-2 rounded-md transition"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition"
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
        <div className="md:hidden fixed top-0 right-0 w-3/4 h-[calc(100%-20px)] rounded-tl-2xl rounded-bl-2xl bg-[#0e0d0d] bg-opacity-95 z-40 flex flex-col gap-2 transition-transform duration-300">

          {/* Top: User Info */}
          <div className=" border-0 h-32 w-[calc(100%-30px)] rounded-2xl flex flex-col items-start pt-0 pl-0 m-2 mt-7">
            {token ? (
              <div className="flex justify-start items-center gap-4 w-full ">
                {/* User Icon */}
                <div className=" bg-black w-14 h-14 flex items-center justify-center rounded-full text-white text-lg mt-4">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-col">
                  {/* Username */}
                  <p className="text-white text-xl mt-1">{user?.name}</p>
                  {/* Email */}
                  <p className="text-gray-200 text-xs">{user?.email}</p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-6 py-4 text-xl font-semibold text-center hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </div>

          {/* Middle: Navigation Links */}
          <div className="flex flex-col items-center px-6 py-2">
            <Link to="/" className="block w-full text-center px-4 py-3 text-lg font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/menu" className="block w-full text-center px-4 py-3 text-lg font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>Menu</Link>
            <Link to="/cart" className="flex items-center justify-center w-full px-4 py-3 text-lg font-semibold gap-2 hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>
              <FiShoppingCart className="text-xl" /> Cart
            </Link>
            <Link to="/contact" className="block w-full text-center px-4 py-3 text-lg font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>Contact</Link>
          </div>

          {/* Bottom: Logout */}
          {token && (
            <div className="px-6 py-2 w-full">
              <button
                onClick={handleLogout}
                className="bg-red-900 px-3 py-2 rounded-md text-sm hover:bg-red-600 transition w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}


    </nav>
  );
};

export default Navbar;
