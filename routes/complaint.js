const express   = require("express");
const router    = express.Router();
const Complaint = require("../models/Complaint");

// SUBMIT COMPLAINT
router.post("/submit", async (req, res) => {
  try {
    const { name, phone, email, complaint_type, location, description } = req.body;
    const complaint = new Complaint({ name, phone, email, complaint_type, location, description });
    await complaint.save();
    res.json({ success: true, message: "Complaint submitted successfully!" });
  } catch (err) {
    res.json({ success: false, message: "Server error: " + err.message });
  }
});

// GET ALL COMPLAINTS (Admin)
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ submittedAt: -1 });
    res.json({ success: true, complaints });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// GET COMPLAINTS BY PHONE (User — to check their own status)
router.post("/mystatus", async (req, res) => {
  try {
    const { phone } = req.body;
    const complaints = await Complaint.find({ phone }).sort({ submittedAt: -1 });
    res.json({ success: true, complaints });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// UPDATE STATUS (Admin)
router.post("/update-status", async (req, res) => {
  try {
    const { id, status, admin_remark } = req.body;
    await Complaint.findByIdAndUpdate(id, {
      status,
      admin_remark,
      updatedAt: new Date()
    });
    res.json({ success: true, message: "Status updated successfully!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
