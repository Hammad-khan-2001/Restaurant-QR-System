import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import authRoutes from "./routes/auth.routes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://restaurant-qr-system-alpha.vercel.app"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

const start = async () => {
  try {
    await connectDB();
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error:", error.message);
  }
};
start();


app.get("/", (req, res) => {
  res.send("API is Working");
});


app.use("/api/v1/auth", authRoutes);

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;
