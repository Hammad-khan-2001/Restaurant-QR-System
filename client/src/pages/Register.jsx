
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Redux/authSlice";   // ✅ sir wala action

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

  // ✅ Sir ka handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // ✅ Sir ka handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="bg-card shadow-2xl rounded-3xl max-w-md w-full p-8">

        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Signup
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.phone}
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-secondary transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4 text-textLight">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
