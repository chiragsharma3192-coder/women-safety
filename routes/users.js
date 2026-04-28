const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

// GET ALL USERS (Admin)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "fullname email phone createdAt emergency_name emergency_phone emergency_relation").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// GET single user profile by email
router.post("/profile", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }, "fullname email phone emergency_name emergency_phone emergency_relation");
    if (!user) return res.json({ success: false, message: "User not found!" });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE emergency contact
router.post("/update-emergency", async (req, res) => {
  try {
    const { email, emergency_name, emergency_phone, emergency_relation } = req.body;
    await User.findOneAndUpdate(
      { email },
      { emergency_name, emergency_phone, emergency_relation }
    );
    res.json({ success: true, message: "Emergency contact updated!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE full profile
router.post("/update-profile", async (req, res) => {
  try {
    const { email, fullname, phone, new_email, emergency_name, emergency_phone, emergency_relation } = req.body;
    if(new_email && new_email !== email){
      const existing = await User.findOne({ email: new_email });
      if(existing) return res.json({ success: false, message: "This email is already used by another account!" });
    }
    await User.findOneAndUpdate(
      { email },
      { fullname, phone, email: new_email || email, emergency_name, emergency_phone, emergency_relation }
    );
    res.json({ success: true, message: "Profile updated successfully!", new_email: new_email || email });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// CHANGE password
router.post("/change-password", async (req, res) => {
  try {
    const bcrypt = require("bcryptjs");
    const { email, old_password, new_password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.json({ success: false, message: "User not found!" });
    const match = await bcrypt.compare(old_password, user.password);
    if(!match) return res.json({ success: false, message: "Current password is incorrect!" });
    const hashed = await bcrypt.hash(new_password, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    res.json({ success: true, message: "Password changed successfully!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
