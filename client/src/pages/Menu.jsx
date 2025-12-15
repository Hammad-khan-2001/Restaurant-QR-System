import React, { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "../components/DishCard";
import Loader from "../components/Loader";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu/all`);
      const mappedDishes = res.data.data.map((dish) => ({
        ...dish,
        image: dish.img || dish.image || "https://via.placeholder.com/300",
        name: dish.name || "",
        category: dish.category || "",
        inStock: dish.inStock ?? true,
        id: dish._id || dish.id, // Redux friendly id
      }));
      setDishes(mappedDishes);
      setLoading(false);
    } catch (err) {
      console.log("Menu fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const filteredDishes = dishes.filter((dish) => {
    const name = (dish.name || "").toLowerCase();
    const cat = (dish.category || "").toLowerCase();
    const s = search.toLowerCase();
    const matchSearch = name.includes(s) || cat.includes(s);
    const matchCategory =
      categoryFilter === "" || cat === categoryFilter.toLowerCase();
    return matchSearch && matchCategory;
  });

  const categories = [...new Set(dishes.map((d) => d.category || "Other"))];

  return (
    <div className="bg-[#0a0600] min-h-screen p-4">
      <div className="mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
        <h2 className="text-3xl font-bold italic text-[#fde9e9] mb-8 pl-2">
          Our Premium Menu
        </h2>

        {/* Search + Category Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 px-2">
          <input
            type="text"
            placeholder="Search dishes..."
            className="w-full p-3 rounded-lg bg-[#1c150f] text-[#fde9e9] placeholder-[#c8b8b8] border border-[#3a3028]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 rounded-lg bg-[#1c150f] text-[#fde9e9] border border-[#3a3028]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <Loader />
          ) : filteredDishes.length > 0 ? (
            filteredDishes.map((item) => <DishCard key={item.id} dish={item} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-2xl font-semibold text-[#fde9e9]">
                No Results Found
              </h3>
              <p className="text-[#c8b8b8] mt-2">Try searching something else...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
