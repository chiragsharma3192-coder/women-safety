const mongoose = require("./node_modules/mongoose");
const bcrypt   = require("./node_modules/bcryptjs");

mongoose.connect("mongodb://localhost:27017/women_safety_project")
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Define schemas inline
    const User = mongoose.model("User", new mongoose.Schema({
      fullname:  String,
      email:     { type: String, unique: true },
      password:  String,
      phone:     String,
      createdAt: { type: Date, default: Date.now }
    }));

    const Complaint = mongoose.model("Complaint", new mongoose.Schema({
      name:           String,
      phone:          String,
      email:          String,
      complaint_type: String,
      location:       String,
      description:    String,
      submittedAt:    { type: Date, default: Date.now }
    }));

    // Clear old data
    await User.deleteMany({});
    await Complaint.deleteMany({});
    console.log("🗑️  Cleared old data");

    // Insert sample users
    const pass1 = await bcrypt.hash("password123", 10);
    const pass2 = await bcrypt.hash("test1234", 10);

    await User.insertMany([
      { fullname: "Priya Sharma",  email: "priya@gmail.com",  password: pass1, phone: "9876543210" },
      { fullname: "Anjali Singh",  email: "anjali@gmail.com", password: pass2, phone: "9123456780" },
      { fullname: "Neha Verma",    email: "neha@gmail.com",   password: pass1, phone: "9988776655" }
    ]);
    console.log("👥 3 sample users inserted");

    // Insert sample complaints
    await Complaint.insertMany([
      {
        name: "Priya Sharma", phone: "9876543210", email: "priya@gmail.com",
        complaint_type: "Harassment", location: "Mumbai, Maharashtra",
        description: "I was harassed by a group of men near the bus stop late at night."
      },
      {
        name: "Anjali Singh", phone: "9123456780", email: "anjali@gmail.com",
        complaint_type: "Cyber Crime", location: "Delhi",
        description: "Someone is misusing my photos on social media without my consent."
      },
      {
        name: "Neha Verma", phone: "9988776655", email: "neha@gmail.com",
        complaint_type: "Stalking", location: "Pune, Maharashtra",
        description: "A person has been following me to my workplace for the past two weeks."
      }
    ]);
    console.log("📋 3 sample complaints inserted");

    console.log("\n✅ DATABASE SETUP COMPLETE!");
    console.log("📦 Database name : women_safety_project");
    console.log("👥 Collections   : users, complaints");
    console.log("🔑 Admin login   : admin / admin123");
    console.log("🔑 User login    : priya@gmail.com / password123");

    mongoose.disconnect();
  })
  .catch(err => {
    console.log("❌ Error:", err.message);
    process.exit(1);
  });
