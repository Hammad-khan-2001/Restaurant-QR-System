import React, { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Paneer Butter Masala", price: 250, qty: 1 },
    { id: 2, name: "Veg Biryani", price: 200, qty: 2 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-bg p-10">
      <h2 className="text-3xl font-bold text-textDark mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 bg-card rounded-lg shadow">
            <div>
              <h3 className="text-textDark font-semibold">{item.name}</h3>
              <p className="text-textLight">Qty: {item.qty}</p>
            </div>
            <p className="text-textDark font-bold">₹{item.price * item.qty}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold text-textDark">Total: ₹{total}</h3>
        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
