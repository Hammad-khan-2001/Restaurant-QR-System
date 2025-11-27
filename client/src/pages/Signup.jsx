import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="bg-card shadow-2xl rounded-3xl max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Signup</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"/>
          <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"/>
          <input type="password" placeholder="Password" className="w-full p-4 rounded-xl border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"/>
          <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition">Login</button>
        </form>
        <p className="text-center mt-4 text-textLight">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}



