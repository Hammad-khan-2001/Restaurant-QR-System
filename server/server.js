import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";

dotenv.config();   // ← Load .env ONLY here

const app = express();
app.use(express.json());

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
