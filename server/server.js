import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();   // ← Load .env ONLY here

const app = express();
app.use(express.json());

await connectDB();

app.use(cors({
  origin: "https://restaurant-qr-system-alpha.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.get('/', (req, res) => res.send("API is Working"));

app.use('/api', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
