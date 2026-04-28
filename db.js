require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/women_safety_project";

mongoose.connect(URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));
