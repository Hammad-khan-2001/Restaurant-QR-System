import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true, }
});

export default mongoose.model("Menu", menuSchema);
