const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const Food = require("../models/Food.js");
const router = express.Router();

// Create Food
router.post("/", authMiddleware, async (req, res) => {
  try {
    const food = await Food.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
