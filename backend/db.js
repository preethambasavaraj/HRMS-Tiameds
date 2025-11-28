// backend/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create and export a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hrms_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
});

// Test connection once when this file is loaded
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
    connection.release();
  }
});

module.exports = db;
