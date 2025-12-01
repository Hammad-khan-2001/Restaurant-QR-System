import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
