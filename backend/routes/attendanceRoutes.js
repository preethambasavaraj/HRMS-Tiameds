// backend/routes/attendanceRoutes.js
const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST /api/attendance/check-in
router.post("/check-in", authMiddleware, (req, res) => {
  const employeeId = req.employeeId;

  const sql = `
    INSERT INTO attendance (employee_id, date, check_in, status)
    VALUES (?, CURDATE(), NOW(), 'PRESENT')
    ON DUPLICATE KEY UPDATE 
      check_in = VALUES(check_in),
      status = 'PRESENT'
  `;

  db.query(sql, [employeeId], (err) => {
    if (err) {
      console.error("❌ Check-in DB Error:", err.message);
      return res.status(500).json({ error: "Database error during check-in" });
    }

    res.json({ message: "Check-in recorded", employeeId });
  });
});

// POST /api/attendance/check-out
router.post("/check-out", authMiddleware, (req, res) => {
  const employeeId = req.employeeId;

  const sql = `
    UPDATE attendance
    SET check_out = NOW()
    WHERE employee_id = ? AND date = CURDATE()
  `;

  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("❌ Check-out DB Error:", err.message);
      return res.status(500).json({ error: "Database error during check-out" });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "No check-in found for today" });
    }

    res.json({ message: "Check-out recorded", employeeId });
  });
});

// GET /api/attendance/today
router.get("/today", authMiddleware, (req, res) => {
  const employeeId = req.employeeId;

  const sql = `
    SELECT * FROM attendance
    WHERE employee_id = ? AND date = CURDATE()
  `;

  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error("❌ Today attendance DB Error:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.json({ message: "No attendance record today" });
    }

    res.json(results[0]);
  });
});

module.exports = router;
