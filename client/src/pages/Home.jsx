import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold font-heading text-textDark mb-4">
        Welcome to <span className="text-primary">Qrovia</span>
      </h1>
      <p className="text-lg md:text-xl text-textLight mb-8 max-w-xl">
        Scan the QR, explore our menu instantly, and enjoy a contactless dining experience.
      </p>
      <Link
        to="/menu"
        className="px-8 py-4 rounded-full bg-amber-500 text-black font-semibold shadow-lg hover:bg-secondary transition"
      >
        Explore Menu
      </Link>
    </div>
  );
}
