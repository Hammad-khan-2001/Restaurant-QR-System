
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { register } from "../Redux/authSlice";   // ✅ sir wala action

// export default function Register() {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   const [confirmPassword, setConfirmPassword] = useState("");

//   // ✅ Sir ka handleChange
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   // ✅ Sir ka handleSubmit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     dispatch(register(formData));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-bg px-4">
//       <div className="bg-card shadow-2xl rounded-3xl max-w-md w-full p-8">

//         <h2 className="text-3xl font-bold text-primary mb-6 text-center">
//           Signup
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
//             value={formData.name}
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
//             value={formData.phone}
//             onChange={handleChange}
//           />

//           {error && (
//             <p className="text-red-500 text-center">{error}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-secondary transition"
//             disabled={loading}
//           >
//             {loading ? "Signing up..." : "Signup"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-textLight">
//           Already have an account?{" "}
//           <Link to="/login" className="text-primary font-bold hover:underline">
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Redux/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register(formData));
  };

  return (
    <div className="bg-[#0c0700] md:min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[950px] bg-[#bd9c6f] [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-2xl overflow-hidden">
        <div className="flex items-center max-md:flex-col w-full gap-y-4">

          {/* LEFT IMAGE */}
          <div className="md:max-w-[570px] w-full h-full">
            <div className="md:aspect-7/10 bg-gray-50 relative before:absolute before:inset-0 before:bg-black/50 overflow-hidden w-full h-full">
              <img
                src="https://plus.unsplash.com/premium_photo-1677000666761-ff476a65c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
                className="w-full h-full object-cover"
                alt="signup img"
              />

              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-full bg-linear-to-t from-black/50 via-black/50 to-transparent absolute bottom-0 p-6 max-md:hidden">
                  <h1 className="text-white text-2xl font-semibold">
                    Create Account
                  </h1>
                  <p className="text-slate-200 text-[13px] font-medium mt-3 leading-relaxed">
                    Join our platform & explore amazing features inside.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full h-full px-8 lg:px-20 py-8 max-md:-order-1">
            <form className="md:max-w-md w-full mx-auto" onSubmit={handleSubmit}>

              <div className="mb-12">
                <h3 className="text-4xl font-bold text-black">Sign up</h3>
              </div>

              {/* Name */}
              <div className="relative flex items-center mb-6">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none bg-transparent"
                />
              </div>

              {/* Email */}
              <div className="relative flex items-center mb-6">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none bg-transparent"
                />
              </div>

              {/* Password */}
              <div className="relative flex items-center mb-6">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none bg-transparent"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative flex items-center mb-6">
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none bg-transparent"
                />
              </div>

              {/* Phone */}
              <div className="relative flex items-center mb-6">
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-sm border-b border-gray-300 focus:border-black pr-8 px-2 py-3 outline-none bg-transparent"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              {/* Submit */}
              <div className="mt-6 space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-black/90 hover:bg-black focus:outline-none"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>

                {/* Login link */}
                <p className="text-slate-800 text-sm text-center mt-2">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-medium hover:underline ml-1"
                  >
                    Login
                  </Link>
                </p>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
