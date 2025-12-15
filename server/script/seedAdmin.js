import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      phone: 9999999999,
      passwordHash: hashedPassword,
      role: "admin",
      accountTypes: "REGISTERED",
      isActive: true,
      totalSpend: 0,
      totalOrders: 0,
      loyaltyPoints: 0
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    console.log("Email: admin@gmail.com");
    console.log("Password: Admin@123");

    process.exit();
  } catch (error) {
    console.log("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
