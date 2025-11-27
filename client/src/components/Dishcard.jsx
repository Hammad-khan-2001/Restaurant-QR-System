// DishCard.jsx
import React from "react";

export default function DishCard({ dish }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform bg-card">
      <img src={dish.img} alt={dish.name} className="w-full h-56 object-cover"/>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary/80 via-transparent p-4">
        <h3 className="text-white font-bold text-lg">{dish.name}</h3>
        <p className="text-accent font-semibold">₹{dish.price}</p>
        <button className="mt-2 w-full bg-secondary text-white py-2 rounded-lg hover:bg-accent transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
