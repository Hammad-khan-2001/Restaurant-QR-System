// DishCard.jsx (Brown Theme)
import React from "react";

export default function DishCard({ dish }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform bg-[#3d0d04]">
      <img
        src={dish.img}
        alt={dish.name}
        className="w-full h-56 object-cover opacity-90"
      />
{/* [#3E272390]  */}
      <div className="absolute bottom-0 w-full bg-linear-to-t from-[#140202] via-70% p-5">
        <h3 className="text-white/95 font-bold text-lg">{dish.name}</h3>
        <p className="text-[#ffc782] font-semibold">₹{dish.price}</p>

        <button className="mt-2 w-full bg-[#3a0404] text-white py-2 rounded-lg hover:bg-[#7a0e37] hover:text-white/90 transition font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

