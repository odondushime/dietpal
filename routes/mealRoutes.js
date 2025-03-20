const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const Meal = require("../models/Meal.js");
const Food = require("../models/Food.js");
const router = express.Router();

// Create Meal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, foods } = req.body;
    const totalCalories = await Food.find({ _id: { $in: foods } }).then(
      (foodsList) => foodsList.reduce((sum, food) => sum + food.calories, 0)
    );

    const meal = await Meal.create({
      name,
      foods,
      totalCalories,
      createdBy: req.user.id,
    });
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Meals
router.get("/", authMiddleware, async (req, res) => {
  try {
    const meals = await Meal.find({ createdBy: req.user.id }).populate("foods");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Meal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
