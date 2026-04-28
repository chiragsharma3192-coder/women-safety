const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const User    = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phone, emergency_name, emergency_phone, emergency_relation } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.json({ success: false, message: "Email already registered!" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ fullname, email, password: hashed, phone, emergency_name, emergency_phone, emergency_relation });
    await user.save();

    res.json({ success: true, message: "Registration successful!" });
  } catch (err) {
    res.json({ success: false, message: "Server error: " + err.message });
  }
});

// LOGIN — also returns emergency contact so SOS can use it
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "admin" && password === "admin123") {
      return res.json({ success: true, role: "admin" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Incorrect password!" });

    res.json({
      success: true,
      role: "user",
      name: user.fullname,
      phone: user.phone,
      emergency_name:     user.emergency_name,
      emergency_phone:    user.emergency_phone,
      emergency_relation: user.emergency_relation
    });
  } catch (err) {
    res.json({ success: false, message: "Server error: " + err.message });
  }
});

module.exports = router;
