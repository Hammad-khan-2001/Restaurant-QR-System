// import React from "react";

// export default function Dishcard({ dish }) {

//   return (
//     <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition hover:scale-105 bg-[#080500]">
//       {/* Dish Image covers entire card */}
//       <img
//         src={dish.image}
//         alt={dish.name}
//         className="w-full h-56 object-cover"
//       />

//       {/* Light brown overlay effect */}
//       <div className="absolute inset-0 bg-linear-to-t from-[#2e1300] via-[#2e1300]/20 to-transparent"></div>

//       {/* Content */}
//       <div className="absolute bottom-0 w-full p-4">
//         <h3 className="text-white font-bold text-lg">{dish.name}</h3>
//         <p className="text-[#f1b975] font-semibold text-sm">₹{dish.price}</p>

//         <button
//           className="mt-2 w-full active:scale-95 hover:cursor-pointer  bg-[#b48c06] text-black py-2 rounded-lg hover:bg-[#dfb21d] font-semibold"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }





import React from "react";
import { useDispatch } from "react-redux";
import { addToCart as addCart } from "../Redux/cartSlice";

export default function DishCard({ dish }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addCart({
        id: dish._id || dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
      })
    );
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg transform transition hover:scale-105">
      {/* Full image */}
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-56 object-cover"
      />

      {/* Light overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#3b1800]/30 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-4">
        <h3 className="text-white font-bold text-lg">{dish.name}</h3>
        <p className="text-[#f1b975] font-semibold text-sm">₹{dish.price}</p>

        <button
          onClick={handleAddToCart}
          className="mt-2 w-full active:scale-95 hover:cursor-pointer bg-[#aa6900] text-black py-2 rounded-lg hover:bg-[#be811f] font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
