import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const items = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
    setDropdown(false);
    setOpen(false);
  };



  // Total quantity count
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0600] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT SIDE (Hamburger + Logo) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white hover:text-[#D4AF37] transition"
            >
              <HiMenu className="h-7 w-7" />
            </button>

            <div className="text-2xl lg:text-3xl text-white/90 font-bold first-letter:text-[#D4AF37]">
              Scanbite
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-6 items-center">
            {user?.role === "admin" && (
              <Link to="/admin" className="hover:text-[#f7c97e] active:text-[#f7c97e] transition">Dashboard</Link>
            )}
            {/* <Link to="/" className="hover:text-[#f7c97e] transition">Home</Link> */}
            {isHome ? (
              <button className="cursor-default text-[#f7c97e]">
                Home
              </button>
            ) : (
              <Link to="/home">
                Home
              </Link>
            )}
            <Link to="/menu" className="hover:text-[#f7c97e] active:text-[#f7c97e] transition">Menu</Link>
            <Link to="/track-order" className="hover:text-[#f7c97e] active:text-[#f7c97e] transition">Orders</Link>
            <Link to="/contact" className="hover:text-[#f7c97e] active:text-[#f7c97e] transition">Contact</Link>


            {/* Cart */}
            <Link to="/cart" className="relative flex items-center hover:text-[#f7c97e] transition">
              <FiShoppingCart size={28} />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>

            {!token ? (
              <Link
                to="/login"
                className="bg-[#D4AF37] text-black shadow-[0_4px_15px_rgba(212,175,55,0.6)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.7)] hover:bg-[#b68e0a] active:scale-95 px-7 py-2 rounded-full transition ml-3"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center justify-center bg-black w-10 h-10 rounded-full text-white"
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

          {/* MOBILE RIGHT SIDE */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart" className="relative mr-1">
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[11px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </Link>

            {!token ? (
              <Link
                to="/login"
                className="bg-[#D4AF37] text-black px-4 py-1.5 rounded-full text-sm shadow-lg"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => setDropdown(!dropdown)}
                className="bg-black w-9 h-9 rounded-full flex items-center justify-center"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE MENU (LEFT SIDE) */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-3/4 max-w-xs bg-[#0a0600] z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-[#D4AF37] transition"
        >
          <HiX className="h-7 w-7" />
        </button>

        {/* USER INFO */}
        {token && (
          <div className="px-6 pt-6 pb-4 border-b border-white/10 text-left">
            <h3 className="font-semibold text-lg">{user?.name}</h3>
            <p className="text-sm text-white/70">{user?.email}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col text-center bg-[#0a0600]">
          <Link onClick={() => setOpen(false)} to="/home" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Home</Link>
          <Link onClick={() => setOpen(false)} to="/menu" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Menu</Link>
          <Link onClick={() => setOpen(false)} to="/track-order" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Orders</Link>
          <Link onClick={() => setOpen(false)} to="/contact" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Contact</Link>

          {token && (
            <button
              onClick={handleLogout}
              className="mt-10 mx-6 py-2 rounded-full bg-red-700 hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





