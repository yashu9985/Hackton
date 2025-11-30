// ==========================================================
// 🌐 server.js — Main Backend Entry Point
// ==========================================================

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ==========================================================
// ⚙️ Middleware
// ==========================================================
app.use(cors());
app.use(express.json());

// ==========================================================
// 🧩 Database Connection (MongoDB)
// ==========================================================
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/studentDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ==========================================================
// 🔗 Routes
// ==========================================================
app.use("/api", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// ==========================================================
// 🚀 Start Server with Error Handling
// ==========================================================
const DEFAULT_PORT = process.env.PORT || 5000;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🔥 Server running on port ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("❌ Server failed to start:", err);
    }
  });
}

startServer(Number(DEFAULT_PORT));
