import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrdersByTable,
  updateOrderStatus,
  cancelOrder,
  completeOrder,
  getLiveOrders,
  getOrderById,
  setPaymentMethod,
  markOrderPaid,
  getUserOrders
} from "../controllers/order.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// router.post("/place", verifyToken, placeOrder);
// router.get("/", getAllOrders);
// router.get("/table/:tableNumber", getOrdersByTable);
// router.put("/status/:id", updateOrderStatus);
// router.put("/cancel/:id", cancelOrder);
// router.put("/complete/:id", completeOrder);
// router.get("/live", getLiveOrders);
// router.get("/:id", getOrderById);
// router.put("/:id/payment-method",setPaymentMethod);
// router.put("/:id/mark-paid",markOrderPaid);
// router.get("/user", verifyToken, getUserOrders);

router.post("/place", verifyToken, placeOrder);

router.get("/user", verifyToken, getUserOrders); 

router.get("/", getAllOrders);
router.get("/table/:tableNumber", getOrdersByTable);
router.get("/live", getLiveOrders);

router.put("/status/:id", updateOrderStatus);
router.put("/cancel/:id", cancelOrder);
router.put("/complete/:id", completeOrder);

router.put("/:id/payment-method", setPaymentMethod);
router.put("/:id/mark-paid", markOrderPaid);

router.get("/:id", getOrderById); 


export default router;
