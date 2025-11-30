import express from "express";
import Student from "../models/student.js"; // ensure import casing matches actual filename 'student.js'

const router = express.Router();

// POST /api/students
router.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to save student" });
  }
});

// GET /api/students — to list all
router.get("/students", async (req, res) => {
  try {
    const all = await Student.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

export default router;
