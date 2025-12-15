import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../Confrimation";

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // --- LOGIC FUNCTIONS (UNCHANGED) ---
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu/all`);
      setItems(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error fetching menu items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    if (image) fd.append("image", image);

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/menu/update/${editingId}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/menu/add`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setForm({ name: "", price: "", category: "" });
      setImage(null);
      fetchItems();
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving item");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/menu/delete/${deleteId}`);
      setItems(items.filter(i => i._id !== deleteId));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({ name: item.name, price: item.price, category: item.category });
  };

  const toggleInStock = async (item) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/menu/update/${item._id}`, {
        inStock: !item.inStock,
      });
      fetchItems();
    } catch (err) {
      console.error("Stock toggle error:", err);
      alert("Error updating stock status");
    }
  };
  // --- END LOGIC FUNCTIONS ---


  // --- STYLING CHANGES START HERE ---
  return (
    <div className="min-h-screen p-8 bg-[#130e08] text-white font-sans">
      <h1 className="text-5xl font-serif font-extrabold mb-10 text-[#ffb703] tracking-wider border-b border-[#ffb703]/50 pb-4">
        SCANBITE | Administration
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#2a1c12] p-8 rounded-xl mb-10 max-w-2xl mx-auto shadow-2xl shadow-[#130e08]/70"
      >
        <h2 className="text-2xl font-serif font-bold mb-6 text-[#ffb703]">
          {editingId ? "Edit Dish Details" : "Add New Menu Item"}
        </h2>

        {/* Form Inputs (Grouped for Spacing) */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Dish Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 rounded-lg w-full bg-[#3d2a1d] border border-[#523b2c] placeholder-gray-400 text-white focus:ring-1 focus:ring-[#ffb703] focus:border-[#ffb703] transition-all duration-300"
            required
          />
          <input
            type="number"
            placeholder="Price (e.g., 999)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 rounded-lg w-full bg-[#3d2a1d] border border-[#523b2c] placeholder-gray-400 text-white focus:ring-1 focus:ring-[#ffb703] focus:border-[#ffb703] transition-all duration-300"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., Starter, Main Course)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 rounded-lg w-full bg-[#3d2a1d] border border-[#523b2c] placeholder-gray-400 text-white focus:ring-1 focus:ring-[#ffb703] focus:border-[#ffb703] transition-all duration-300"
            required
          />

          <div className="pt-2">
            <label className="block text-sm font-medium mb-1 text-gray-400">
              {editingId ? "Replace Image (Optional)" : "Upload Image"}
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              // Styled file input for dark mode (using file: pseudo-class)
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4d3a2c] file:text-[#ffb703] hover:file:bg-[#5a4332] transition-colors duration-300"
            />
          </div>
        </div>

        {/* Submit Button (Bronze CTA) */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[#ffb703] text-[#130e08] font-extrabold py-3 rounded-lg transition-all duration-300 transform hover:bg-[#ffc857] hover:shadow-xl hover:shadow-[#ffb703]/20 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "SAVING..." : (editingId ? "UPDATE DISH" : "ADD NEW DISH")}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setForm({ name: "", price: "", category: "" }); setImage(null); }}
            className="mt-2 w-full text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Items Table */}
      <div className="overflow-x-auto bg-[#2a1c12] rounded-xl shadow-2xl shadow-[#130e08]/70 border border-[#3b2a1e]">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#3b2a1e] border-b border-[#523b2c]">
              <th className="px-4 py-3 text-left text-xs uppercase font-medium text-gray-300 tracking-wider">Image</th>
              <th className="px-4 py-3 text-left text-xs uppercase font-medium text-gray-300 tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs uppercase font-medium text-gray-300 tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs uppercase font-medium text-gray-300 tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs uppercase font-medium text-gray-300 tracking-wider">Stock Status</th>
              <th className="px-4 py-3 text-left text-xs uppercase font-medium text-gray-300 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3b2a1e]">
            {items.map((item) => (
              <tr
                key={item._id}
                className={`transition-colors duration-200 hover:bg-[#3d2a1f] ${!item.inStock ? "opacity-70 italic" : ""
                  }`}
              >
                <td className="px-4 py-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border border-[#523b2c]"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{item.name}</td>
                <td className="px-4 py-3 text-[#ffc782] font-extrabold">
                  ₹{item.price}
                </td>
                <td className="px-4 py-3 text-gray-400">{item.category}</td>

                {/* Stock Toggle (Improved Design) */}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div
                      onClick={() => toggleInStock(item)}
                      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-inner ${item.inStock ? "bg-green-600/70" : "bg-red-600/70"
                        }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${item.inStock ? "translate-x-7" : "translate-x-0"
                          }`}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${item.inStock ? "text-green-400" : "text-red-400"}`}>
                      {item.inStock ? "Available" : "Sold Out"}
                    </span>
                  </div>
                </td>

                {/* Action Buttons (Refined Look) */}
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-700/80 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md active:scale-95 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    className="bg-red-700/80 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md active:scale-95 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Confirmation Modal (Needs separate styling for luxury) */}
        <ConfirmModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Do you really want to delete this item? This action is irreversible."
        />
      </div>
    </div>
  );
}