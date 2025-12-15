import Menu from "../models/menu.js";
import cloudinary from "../configs/cloudinary.js";


// ADD MENU ITEM
export const addMenuItem = async (req, res) => {
  try {

    const { name, price, category, inStock } = req.body;

    // let img = null;
    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "menu-items"
    //   });
    //   img = result.secure_url;
    // }
    let img = req.file ? req.file.path : null;

    const dish = await Menu.create({
      name,
      price,
      img,
      category,
      inStock: inStock ?? true,
    });

    res.json({ success: true, data: dish });

  } catch (error) {
    console.error("ADD ERROR FULL ✅:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Add Bulk Menu
// POST /api/menu/bulk-add
export const bulkAdd = async (req, res) => {
  try {
    const items = req.body; // expects array of items
    const result = await Menu.insertMany(items);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}



// SEARCH menu items (category + inStock)
// GET /api/menu/search?category=Drinks&inStock=true
export const searchMenu = async (req, res) => {
  try {
    const { category, inStock } = req.query;

    let filter = {};

    if (category) filter.category = { $regex: category, $options: "i" };
    if (inStock !== undefined) filter.inStock = inStock === "true";

    const items = await Menu.find(filter);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET single menu item by ID
// GET /api/menu/64a1f7b5c12345abcd67890
export const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Menu.findById(id);

    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET MENU ITEMS
export const getMenu = async (req, res) => {
  try {
    const items = await Menu.find();
    res.json({ success: true, data: items });
  } catch (error) {
    console.error("GET MENU ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE MENU ITEM
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "menu_items",
    //   });

    //   updateData.img = result.secure_url; // Save cloud URL
    // }
    if (req.file) {
      updateData.img = req.file.path; // Already Cloudinary URL
    }

    const updated = await Menu.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("UPDATE MENU ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// DELETE MENU ITEM
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.error("DELETE MENU ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
