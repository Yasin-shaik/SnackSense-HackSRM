import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  dietType: {
    type: [String],
    enum: [
      "Vegetarian",
      "Vegan",
      "Keto",
      "Low-Carb",
      "High-Protein",
      "Mediterranean",
      "Paleo",
      "Gluten-Free",
      "Dairy-Free",
    ],
  },
  allergies: {
    type: [String],
    enum: [
      "Gluten",
      "Lactose/Dairy",
      "Nuts",
      "Soy",
      "Eggs",
      "Seafood (Fish/Shellfish)",
      "Artificial Preservatives & Additives",
    ],
  },
  activityLevel: {
    type: String,
    enum: ["Sedentary", "Light Activity", "Moderate", "Active", "Very Active"],
    required: true,
  },
  waterIntake: {
    type: Number,
    required: true,
  },
  sleepHours: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("UserDetails", userSchema);
