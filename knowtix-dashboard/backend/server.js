import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "knowtix",
});

db.connect((err) => {
  if (err) return console.error("MySQL connection failed:", err);
  console.log("✅ Connected to MySQL");
});


// ================== USER MANAGEMENT ==================

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, grade, password } = req.body;
  if (!name || !email || !grade || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (name, email, grade, password) VALUES (?, ?, ?, ?)",
      [name, email, grade, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json({ success: true, userId: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, userId: user.id, grade: user.grade });
  });
});

// Get all users (JSON)
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    const maskedUsers = results.map((u, index) => ({
      id: index + 1,
      name: u.name,
      username: u.username,
      email: u.email,
      password: "****",
      score: u.score,
      interest_rating: u.interest_rating,
      grade: u.grade,
    }));
    res.json(maskedUsers);
  });
});


// ================== QUIZ QUESTIONS ==================

// Get all quiz questions
app.get("/api/quiz", (req, res) => {
  db.query("SELECT * FROM quiz_questions ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

// Add a quiz question
app.post("/api/quiz", (req, res) => {
  const { question, options, answer } = req.body;
  db.query(
    "INSERT INTO quiz_questions (question, options, answer) VALUES (?, ?, ?)",
    [question, JSON.stringify(options), answer],
    (err, result) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json({ success: true, id: result.insertId });
    }
  );
});


// ================== SCORES ==================

// Save user score
app.post("/api/scores", (req, res) => {
  const { user_id, score } = req.body;
  db.query(
    "INSERT INTO scores (user_id, score) VALUES (?, ?)",
    [user_id, score],
    (err) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json({ success: true });
    }
  );
});

// Get all scores
app.get("/api/scores", (req, res) => {
  db.query("SELECT * FROM scores ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});


// ================== NOTES ==================
app.post("/api/notes", (req, res) => {
  const { user_id, content } = req.body;
  db.query("INSERT INTO notes (user_id, content) VALUES (?, ?)", [user_id, content], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true });
  });
});

app.get("/api/notes/:user_id", (req, res) => {
  db.query("SELECT * FROM notes WHERE user_id = ?", [req.params.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});


// ================== STICKY NOTES ==================
app.post("/api/sticky", (req, res) => {
  const { user_id, note } = req.body;
  db.query("INSERT INTO sticky_notes (user_id, note) VALUES (?, ?)", [user_id, note], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true });
  });
});

app.get("/api/sticky/:user_id", (req, res) => {
  db.query("SELECT * FROM sticky_notes WHERE user_id = ?", [req.params.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});


// ================== EVENTS ==================
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events ORDER BY date ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

app.post("/api/events", (req, res) => {
  const { title, date, description } = req.body;
  db.query("INSERT INTO events (title, date, description) VALUES (?, ?, ?)", [title, date, description], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true });
  });
});


// ================== DOCUMENTS ==================
app.get("/api/documents", (req, res) => {
  db.query("SELECT * FROM documents", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

app.post("/api/documents", (req, res) => {
  const { title, content } = req.body;
  db.query("INSERT INTO documents (title, content) VALUES (?, ?)", [title, content], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true });
  });
});


// ================== MATERIALS ==================
app.get("/api/materials", (req, res) => {
  db.query("SELECT * FROM materials", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

app.post("/api/materials", (req, res) => {
  const { name, type, link } = req.body;
  db.query("INSERT INTO materials (name, type, link) VALUES (?, ?, ?)", [name, type, link], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true });
  });
});


// ================== FEATURE ACCESS ==================
app.get("/api/features", (req, res) => {
  db.query("SELECT * FROM feature_access", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

app.post("/api/features", (req, res) => {
  const { user_id, feature_name, access } = req.body;
  db.query(
    "INSERT INTO feature_access (user_id, feature_name, access) VALUES (?, ?, ?)",
    [user_id, feature_name, access],
    (err) => {
      if (err) return res.status(500).json({ error: "DB error" });
      res.json({ success: true });
    }
  );
});


// ================== USER LOGS ==================
app.get("/api/logs", (req, res) => {
  db.query("SELECT * FROM user_logs ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

app.post("/api/logs", (req, res) => {
  const { user_id, action } = req.body;
  db.query("INSERT INTO user_logs (user_id, action) VALUES (?, ?)", [user_id, action], (err) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ success: true });
  });
});


// ================== START SERVER ==================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
