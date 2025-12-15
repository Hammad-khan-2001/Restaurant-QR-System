import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  addToCart,
  getCart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.post("/increase", verifyToken, increaseQty);
router.post("/decrease", verifyToken, decreaseQty);
router.post("/remove", verifyToken, removeItem);
router.delete("/clear", verifyToken, clearCart);

export default router;
