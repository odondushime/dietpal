const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    totalCalories: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", MealSchema);
