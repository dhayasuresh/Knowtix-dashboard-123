// routes/users.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // your MySQL connection

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT id, username, email FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Add a new user
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User added", userId: result.insertId });
    }
  );
});

module.exports = router;
