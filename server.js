const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests (important for frontend-backend communication)

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "admin_system", // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Admin login route
app.post("/admin/login", (req, res) => {
  // Add a log to check if the request is received
  console.log("POST /admin/login received. Body:", req.body);

  const { username, password, pin } = req.body;

  // Validate input
  if (!username || !password || !pin) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Fetch admin details from the database
  const query = "SELECT * FROM admins WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username, password, or PIN" });
    }

    const admin = results[0];

    // Check PIN
    if (admin.pin !== pin) {
      return res.status(401).json({ message: "Invalid username, password, or PIN" });
    }

    // Check Password (Plain Text)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid username, password, or PIN" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful" });
  });
});

// Patient login route
app.post("/patient/login", (req, res) => {
  // Add a log to check if the request is received
  console.log("POST /patient/login received. Body:", req.body);

  const { username, password, pin } = req.body;

  // Validate input
  if (!username || !password || !pin) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Fetch admin details from the database
  const query = "SELECT * FROM patients WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username, password, or PIN" });
    }

    const patient = results[0];

    // Check PIN
    if (patient.pin !== pin) {
      return res.status(401).json({ message: "Invalid username, password, or PIN" });
    }

    // Check Password (Plain Text)
    if (patient.password !== password) {
      return res.status(401).json({ message: "Invalid username, password, or PIN" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful" });
  });
});
// Patient signup route
app.post("/patient/signup", (req, res) => {
  console.log("POST /patient/signup received. Body:", req.body);

  const { username, password, pin } = req.body;

  // Validate input
  if (!username || !password || !pin) {
      return res.status(400).json({ message: "All fields are required" });
  }

  // Insert new patient into the database
  const query = "INSERT INTO patients (username, password, pin) VALUES (?, ?, ?)";
  db.query(query, [username, password, pin], (err, results) => {
      if (err) {
          console.error("Database error:", err);
          // Check for unique constraint violation
          if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ message: "Username already exists" });
          }
          return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({ message: "Signup successful" });
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
