// ============================================================
// 🔐 routes/auth.js — Handles Signup & Login
// ============================================================
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
});

// ✅ Create User model
const User = mongoose.model("User", userSchema);

// ============================================================
// 🧾 SIGNUP (POST /api/signup)
// ============================================================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ============================================================
// 🔑 LOGIN (POST /api/login)
// ============================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ============================================================
// 👩‍🏫 GET ADMINS (GET /api/admins)
// ============================================================
router.get("/admins", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("username email");
    res.json(admins);
  } catch (err) {
    console.error("❌ Fetch Admins Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
