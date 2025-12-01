import React, { useEffect, useState } from "react";
import DishCard from "../components/Dishcard";

export default function Menu() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const data = [
      {
        name: "Chole Bhature",
        price: 120,
        img: "https://i.pinimg.com/originals/0a/77/4f/0a774f8291e10f7caf519347483eb2c3.jpg",
      },
      {
        name: "Fried Rice",
        price: 150,
        img: "https://images.getrecipekit.com/20220904015448-veg-20fried-20rice.png?aspect_ratio=16:9&quality=90&",
      },
      {
        name: "Sandwich",
        price: 60,
        img: "https://img.freepik.com/free-photo/side-view-club-sandwich-with-salted-cucumbers-lemon-olives-round-white-plate_176474-3049.jpg",
      },
      {
        name: "Veg Momo",
        price: 100,
        img: "https://cdn.dotpe.in/longtail/store-items/8248386/866CEgcm.webp",
      },
      {
        name: "Mango Juice",
        price: 60,
        img: "https://cdn1.foodviva.com/static-content/food-images/juice-recipes/mango-juice/mango-juice.jpg",
      },
      {
        name: "Grilled Pizza",
        price: 180,
        img: "https://media.istockphoto.com/id/1127544478/photo/vegetarian-pizza-with-addition-grilled-vegetables-and-aromatic-herbs.jpg?s=612x612&w=0&k=20&c=Hf7FBk7hBX9Dj3KCZj7coOWZ9uy1nTIBP6wvPBvoUVM=",
      },
      {
        name: "Cold Coffee",
        price: 80,
        img: "https://rakskitchen.net/wp-content/uploads/2016/12/Cold-coffee-recipe-500x500.jpg",
      },
      {
        name: "Grilled Burger",
        price: 120,
        img: "https://groundbeefrecipes.com/wp-content/uploads/perfect-grilled-burgers.jpg",
      },
    ];

    setDishes(data);
  }, []);

  return (
    <div className="bg-linear-to-b from-black via-[#000000] to-[#070000] min-h-screen p-4">
      <div className="mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
        <h2 className="text-3xl font-bold italic text-[#fde9e9] mb-8 pl-2">
          Our Premium Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dishes.map((item, index) => (
            <DishCard key={index} dish={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
