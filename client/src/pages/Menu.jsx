// Menu.jsx
import React from "react";
import DishCard from "../components/Dishcard";

const dishes = [
  { id: 1, name: "Paneer Butter Masala", price: 250, img: "https://source.unsplash.com/300x200/?paneer" },
  { id: 2, name: "Veg Biryani", price: 200, img: "https://source.unsplash.com/300x200/?biryani" },
  { id: 3, name: "Chocolate Cake", price: 150, img: "https://source.unsplash.com/300x200/?cake" },
];

export default function Menu() {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-bg min-h-screen">
      {dishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
    </div>
  );
}
