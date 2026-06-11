const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  phone:          { type: String, required: true },
  email:          { type: String },
  complaint_type: { type: String, required: true },
  location:       { type: String, required: true },
  description:    { type: String, required: true },
  status:         { type: String, default: "Pending", enum: ["Pending", "In Progress", "Resolved"] },
  admin_remark:   { type: String, default: "" },
  submittedAt:    { type: Date, default: Date.now },
  updatedAt:      { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);
