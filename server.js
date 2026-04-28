require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth",      require("./routes/auth"));
app.use("/api/complaint", require("./routes/complaint"));
app.use("/api/users",     require("./routes/users"));

app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "public", "wlogin.html")));

app.get("/api/health", (_req, res) => {
  const mongoose = require("mongoose");
  const states   = { 0:"Disconnected", 1:"Connected", 2:"Connecting", 3:"Disconnecting" };
  res.json({ status: states[mongoose.connection.readyState], db: "women_safety_project" });
});

app.get("/api/sos/all", async (_req, res) => {
  try {
    const mongoose = require("mongoose");
    const SOS = mongoose.models.SOS || mongoose.model("SOS", new mongoose.Schema({
      user_name: String, user_phone: String, emergency_phone: String,
      latitude: Number, longitude: Number, maps_link: String,
      triggered_at: { type: Date, default: Date.now }
    }));
    const alerts = await SOS.find().sort({ triggered_at: -1 });
    res.json({ success: true, alerts });
  } catch(err) { res.json({ success: false, alerts: [], message: err.message }); }
});

app.post("/api/sos", async (req, res) => {
  try {
    const { user_name, user_phone, emergency_phone, latitude, longitude } = req.body;
    const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
    const mongoose = require("mongoose");
    const SOS = mongoose.models.SOS || mongoose.model("SOS", new mongoose.Schema({
      user_name: String, user_phone: String, emergency_phone: String,
      latitude: Number, longitude: Number, maps_link: String,
      triggered_at: { type: Date, default: Date.now }
    }));
    await SOS.create({ user_name, user_phone, emergency_phone, latitude, longitude, maps_link: mapsLink });
    const msg = encodeURIComponent(
      `🚨 *SOS ALERT!*\n\n*${user_name}* needs immediate help!\n📞 Her Phone: ${user_phone}\n\n📍 *Live Location:*\n${mapsLink}\n\n_Sent from Women Safety App_`
    );
    const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || "917387214232";
    res.json({
      success: true,
      maps_link: mapsLink,
      whatsapp_emergency: `https://wa.me/${emergency_phone.replace(/\D/g,"")}?text=${msg}`,
      whatsapp_admin:     `https://wa.me/${ADMIN_WHATSAPP}?text=${msg}`
    });
  } catch(err) { res.json({ success: false, message: err.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
