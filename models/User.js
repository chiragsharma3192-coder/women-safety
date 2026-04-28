const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname:          { type: String, required: true },
  email:             { type: String, required: true, unique: true },
  password:          { type: String, required: true },
  phone:             { type: String, required: true },
  emergency_name:    { type: String, required: true },
  emergency_phone:   { type: String, required: true },
  emergency_relation:{ type: String, required: true },
  createdAt:         { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
