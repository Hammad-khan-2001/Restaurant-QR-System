import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/auth.routes.js";
import tableRoutes from './routes/table.routes.js'
import sessionRoutes from './routes/session.routes.js';
import adminAuthRoutes from "./routes/admin.auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js";
// import path from "path";
// import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "https://scanbite-restaurant.vercel.app"];

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
app.use('/api/v1', tableRoutes);
app.use('/api/v1', sessionRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/v1/orders", orderRoutes);


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve React build folder first
// app.use(express.static(path.join(__dirname, "../client/dist")));

// // Catch-all for React Router
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


export default app;
