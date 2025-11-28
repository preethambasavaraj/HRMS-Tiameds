// backend/routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, designation, username, password } =
    req.body;

  if (!username || !password || !first_name || !email) {
    return res
      .status(400)
      .json({ error: "First name, email, username, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO employees (first_name, last_name, email, designation, username, password_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [first_name, last_name, email, designation, username, hashedPassword],
      (err) => {
        if (err) {
          console.error("❌ Register Error:", err.message);

          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "Email or username already exists" });
          }

          return res
            .status(500)
            .json({ error: "Failed to register employee" });
        }

        res.json({ message: "Employee registered successfully" });
      }
    );
  } catch (e) {
    console.error("❌ Hashing error:", e);
    res.status(500).json({ error: "Internal error while creating user" });
  }
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM employees WHERE username = ? LIMIT 1`;

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("❌ Login DB Error:", err.message);
      return res.status(500).json({ error: "Database error during login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const employee = results[0];

    try {
      const validPass = await bcrypt.compare(password, employee.password_hash);

      if (!validPass) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      const token = jwt.sign({ id: employee.id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        message: "Login successful",
        token,
        employee: {
          id: employee.id,
          first_name: employee.first_name,
          designation: employee.designation,
        },
      });
    } catch (e) {
      console.error("❌ Bcrypt compare error:", e);
      res.status(500).json({ error: "Internal auth error" });
    }
  });
});

module.exports = router;
