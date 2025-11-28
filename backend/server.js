// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db"); // just to ensure DB connects once
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "HRMS backend running" });
});

// Use route modules
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
