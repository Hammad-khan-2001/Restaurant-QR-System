import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();   // ← Load .env ONLY here

const app = express();
app.use(express.json());

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// app.use('/', (req, res) => {
//   res.send('This is home page');
// })

app.use('/api', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
