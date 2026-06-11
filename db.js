require("dotenv").config();
const mongoose = require("mongoose");

// Use Atlas URI from .env, fallback to local
const URI = process.env.MONGO_URI || "mongodb://localhost:27017/women_safety_project";

mongoose.connect(URI)
  .then(() => console.log("✅ MongoDB Connected:", URI.includes("mongodb+srv") ? "Atlas (Cloud)" : "Local"))
  .catch((err) => console.log("❌ MongoDB Error:", err));
