// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { HiMenu, HiX } from "react-icons/hi";
// import { FiShoppingCart } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Redux/authSlice";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(false); // User dropdown
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     setDropdown(false);
//     setOpen(false);
//   };

//   return (
//     <nav className="relative z-50 bg-[#0f0900]  text-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="shrink-0 text-3xl text-white/90 font-bold first-letter:text-[#D4AF37]">
//             Scanbite
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link to="/" className=" hover:text-[#f7c97e] transition">Home</Link>
//             <Link to="/menu" className="hover:text-[#f7c97e] transition">Menu</Link>
//             <Link to="/contact" className="hover:text-[#f7c97e] transition">Contact</Link>
//             <Link to="/cart" className="relative flex items-center hover:text-[#f7c97e] transition">
//               <FiShoppingCart size={28} />
//               {/* Notification Badge */}
//               <span className="absolute -top-2 -right-2 bg-[#cc9c00] text-black text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 3
//               </span>
//             </Link>

//             {/* Conditional Login / Profile */}
//             {!token ? (
//               <Link
//                 to="/login"
//                 className="bg-[#D4AF37] font-medium text-black hover:bg-[#b68e0a] active:scale-95 px-7 py-1.5 ml-4 rounded-xl transition"
//               >
//                 Login
//               </Link>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdown(!dropdown)}
//                   className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition"
//                 >
//                   {user?.name?.charAt(0).toUpperCase() || "U"}
//                 </button>

//                 {dropdown && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
//                     <div className="px-4 py-2 border-b">
//                       <p className="font-semibold">{user?.name}</p>
//                       <p className="text-sm text-gray-600">{user?.email}</p>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden flex items-center z-50">
//             <button
//               onClick={() => setOpen(!open)}
//               className="text-white hover:text-[#D9B08C] focus:outline-none"
//             >
//               {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {open && (
//         <div className="md:hidden fixed top-0 right-0 w-3/4 h-[calc(100%)] rounded-tl-2xl rounded-bl-2xl bg-[#0f0900] bg-opacity-95 z-40 flex flex-col gap-2 transition-transform duration-300">

//           {/* Top: User Info */}
//           <div className=" border-0 h-32 w-[calc(100%-30px)] rounded-2xl flex flex-col items-start pt-0 pl-0 m-2 mt-7">
//             {token ? (
//               <div className="flex justify-start items-center gap-4 w-full ">
//                 {/* User Icon */}
//                 <div className=" bg-black w-14 h-14 flex items-center justify-center rounded-full text-white text-lg mt-4">
//                   {user?.name?.charAt(0).toUpperCase() || "U"}
//                 </div>
//                 <div className="flex flex-col">
//                   {/* Username */}
//                   <p className="text-white text-xl mt-1">{user?.name}</p>
//                   {/* Email */}
//                   <p className="text-gray-200 text-xs">{user?.email}</p>
//                 </div>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="block px-6 py-4 text-xl font-semibold text-center hover:bg-[#A67856] hover:text-[#7C4A2F] transition w-full"
//                 onClick={() => setOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Middle: Navigation Links */}
//           <div className="flex flex-col items-center px-6 py-2">
//             <Link to="/" className="block w-full text-center px-4 py-3 text-lg font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>Home</Link>
//             <Link to="/menu" className="block w-full text-center px-4 py-3 text-lg font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>Menu</Link>
//             <Link to="/cart" className="flex items-center justify-center w-full px-4 py-3 text-lg font-semibold gap-2 hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>
//               <FiShoppingCart className="text-xl" /> Cart
//             </Link>
//             <Link to="/contact" className="block w-full text-center px-4 py-3 text-lg font-semibold hover:bg-[#A67856] hover:text-[#7C4A2F] transition" onClick={() => setOpen(false)}>Contact</Link>
//           </div>

//           {/* Bottom: Logout */}
//           {token && (
//             <div className="px-6 py-2 w-full">
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-900 px-3 py-2 rounded-md text-sm hover:bg-red-600 transition w-full"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}


//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { HiMenu, HiX } from "react-icons/hi";
// import { FiShoppingCart } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Redux/authSlice";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(false);
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     setDropdown(false);
//     setOpen(false);
//   };

//   return (
//     <nav className="relative z-50 bg-[#0f0900] text-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">

//           {/* LEFT SIDE (Hamburger + Logo) */}
//           <div className="flex items-center gap-3">

//             {/* Hamburger (mobile only) */}
//             <button
//               onClick={() => setOpen(!open)}
//               className="md:hidden text-white hover:text-[#D4AF37] transition"
//             >
//               {open ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
//             </button>

//             {/* Logo */}
//             <div className="text-2xl lg:text-3xl text-white/90 font-bold first-letter:text-[#D4AF37]">
//               Scanbite
//             </div>
//           </div>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link to="/" className="hover:text-[#f7c97e] transition">Home</Link>
//             <Link to="/menu" className="hover:text-[#f7c97e] transition">Menu</Link>
//             <Link to="/contact" className="hover:text-[#f7c97e] transition">Contact</Link>

//             {/* Cart */}
//             <Link to="/cart" className="relative flex items-center hover:text-[#f7c97e] transition">
//               <FiShoppingCart size={28} />
//               <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                 3
//               </span>
//             </Link>

//             {/* Login/Profile */}
//             {!token ? (
//               <Link
//                 to="/login"
//                 className="bg-[#D4AF37] text-black shadow-[0_4px_15px_rgba(212,175,55,0.6)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.7)] hover:bg-[#b68e0a] active:scale-95 px-7 py-2 rounded-full transition ml-3"
//               >
//                 Login
//               </Link>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdown(!dropdown)}
//                   className="flex items-center justify-center bg-black w-10 h-10 rounded-full text-white"
//                 >
//                   {user?.name?.charAt(0).toUpperCase() || "U"}
//                 </button>

//                 {dropdown && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
//                     <div className="px-4 py-2 border-b">
//                       <p className="font-semibold">{user?.name}</p>
//                       <p className="text-sm text-gray-600">{user?.email}</p>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* MOBILE RIGHT SIDE (LOGIN / PROFILE ALWAYS HERE) */}
//           <div className="md:hidden flex items-center gap-3">

//             <Link to="/cart" className="relative mr-2">
//               <FiShoppingCart size={24} />
//               <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[11px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
//                 3
//               </span>
//             </Link>

//             {!token ? (
//               <Link
//                 to="/login"
//                 className="bg-[#D4AF37] text-black px-4 py-1.5 rounded-full text-sm shadow-lg"
//               >
//                 Login
//               </Link>
//             ) : (
//               <button
//                 onClick={() => setDropdown(!dropdown)}
//                 className="bg-black w-9 h-9 rounded-full flex items-center justify-center"
//               >
//                 {user?.name?.charAt(0).toUpperCase()}
//               </button>
//             )}

//           </div>
//         </div>
//       </div>

//       {/* MOBILE SLIDE MENU */}
//       <div
//         className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-[#0f0900] z-40 transform transition-transform duration-300 
//         ${open ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="mt-20 flex flex-col text-center">

//           <Link to="/" onClick={() => setOpen(false)} className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Home</Link>
//           <Link to="/menu" onClick={() => setOpen(false)} className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Menu</Link>
//           <Link to="/contact" onClick={() => setOpen(false)} className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Contact</Link>

//           {token && (
//             <button
//               onClick={handleLogout}
//               className="mt-10 mx-6 py-2 rounded-full bg-red-700 hover:bg-red-600"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>

//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setDropdown(false);
    setOpen(false);
  };

  return (
    <nav className="relative z-50 bg-[#0f0900] text-white shadow-md">
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
            <Link to="/" className="hover:text-[#f7c97e] transition">Home</Link>
            <Link to="/about" className="hover:text-[#f7c97e] transition">About</Link>
            <Link to="/menu" className="hover:text-[#f7c97e] transition">Menu</Link>
            <Link to="/contact" className="hover:text-[#f7c97e] transition">Contact</Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center hover:text-[#f7c97e] transition">
              <FiShoppingCart size={28} />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
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
                3
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
        className={`md:hidden fixed top-0 left-0 h-full w-3/4 max-w-xs bg-[#0f0900] z-40 transform transition-transform duration-300
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

        <div className="mt-8 flex flex-col text-center">
          <Link onClick={() => setOpen(false)} to="/" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Home</Link>
          <Link onClick={() => setOpen(false)} to="/about" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">About</Link>
          <Link onClick={() => setOpen(false)} to="/menu" className="py-4 text-lg border-b border-white/10 hover:text-[#D4AF37]">Menu</Link>
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
