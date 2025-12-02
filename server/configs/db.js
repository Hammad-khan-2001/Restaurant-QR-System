import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);

    isConnected = db.connections[0].readyState;
    console.log("🔥 MongoDB Connected");
  } catch (error) {
    console.error("❌ Mongo connection failed:", error.message);
    throw error;
  }
};
