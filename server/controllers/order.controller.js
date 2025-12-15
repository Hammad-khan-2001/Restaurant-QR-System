import Order from "../models/order.js";
import Table from "../models/table.js";



// PLACE ORDER

export const placeOrder = async (req, res) => {
    try {

        const { tableNumber, tableId, items } = req.body;


        if (!tableNumber || !items || !items.length) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const totalAmount = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const newOrder = await Order.create({
            user: req.user.id,
            tableNumber,
            tableId,
            items,
            totalAmount,
            status: "pending"
        });

        await Table.findByIdAndUpdate(tableId, { isActive: true });

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.log("Place Order Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// GET ALL ORDERS (Admin)

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log("Get Orders Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// GET /api/v1/orders/:id
export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
};



// GET ORDERS BY TABLE

export const getOrdersByTable = async (req, res) => {
    try {
        const { tableNumber } = req.params;

        const orders = await Order.find({ tableNumber }).sort({
            createdAt: -1,
        });

        res.json(orders);
    } catch (error) {
        console.log("Table Order Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// UPDATE STATUS 

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        // Table auto deactivate hojayegi order complete hote hi
        if (status === "completed" || status === "cancelled") {
            await Table.findByIdAndUpdate(updated.tableId, { isActive: false });
        }


        res.json(updated);
    } catch (error) {
        console.log("Status Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// CANCEL ORDER 
export const cancelOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "cancelled" },
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        console.log("Cancel Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


//  COMPLETE ORDER

export const completeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // 1️⃣ order completed
        order.status = "completed";
        await order.save();

        // 2️⃣ table inactive
        await Table.findOneAndUpdate(
            { tableNumber: order.tableNumber },
            { isActive: false }
        );

        res.json({
            success: true,
            message: "Order completed & table released",
        });

    } catch (err) {
        console.log("Complete Order Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};




// LIVE ORDERS (Admin)
export const getLiveOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            status: { $in: ["pending", "preparing"] }
        }).sort({ createdAt: 1 });

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.log("Live Orders Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// PAYMENT METHOD
export const setPaymentMethod = async (req, res) => {
    try {
        const { paymentMethod } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });

        order.paymentMethod = paymentMethod;
        await order.save();

        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};




// Order Paid OR Unpaid

export const markOrderPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });

        order.paymentStatus = "paid";
        order.status = "completed";
        await order.save();

        await Table.findByIdAndUpdate(order.tableId, { isActive: false });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};



// Get Orders Of User

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ data: orders });
    } catch (err) {
        console.error("Get User Orders Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};