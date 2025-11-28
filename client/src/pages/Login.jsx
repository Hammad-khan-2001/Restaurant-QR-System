import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authThunks";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // SUCCESS DETECTION
  useEffect(() => {
    if (token) {
      alert("Login Successful!");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="bg-card shadow-2xl rounded-3xl max-w-md w-full p-8">

        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-secondary transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-textLight">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}



