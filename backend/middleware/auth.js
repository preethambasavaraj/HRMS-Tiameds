// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const token = header ? header.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded?.id) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.employeeId = decoded.id; // attach employee id so next request uses it
    next();
  });
}

module.exports = authMiddleware;
