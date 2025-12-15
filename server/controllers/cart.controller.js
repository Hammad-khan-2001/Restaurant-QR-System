import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { dishId } = req.body;

    if (!dishId) {
      return res.status(400).json({ message: "Dish ID is required" });
    }

    let cart = await Cart.findOne({ userId });

    // If no cart, create new
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ dishId, quantity: 1 }],
      });

      return res.json({ success: true, message: "Added to cart", cart });
    }

    // Check if dish already exists
    const existingItem = cart.items.find((item) => item.dishId.toString() === dishId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ dishId, quantity: 1 });
    }

    await cart.save();

    return res.json({ success: true, message: "Added to cart", cart });
  } catch (error) {
    console.log("Add Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.dishId");

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const increaseQty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { dishId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.dishId.toString() === dishId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const decreaseQty = async (req, res) => {
  try {
    const userId = req.user.id;
    const { dishId } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find((i) => i.dishId.toString() === dishId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter((i) => i.dishId.toString() !== dishId);
    }

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { dishId } = req.body;

    const cart = await Cart.findOne({ userId });

    cart.items = cart.items.filter((i) => i.dishId.toString() !== dishId);

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

