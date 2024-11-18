const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospital_system",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Add or Modify Doctor (with schedule)
app.post("/doctors", (req, res) => {
  const { doctorID, doctorName, doctorSpecialty, doctorPhone } = req.body;

  if (!doctorID || !doctorName || !doctorSpecialty || !doctorPhone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert or update the doctor
  const doctorQuery = `
    INSERT INTO doctors (doctorID, doctorName, doctorSpecialty, doctorPhone)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      doctorName = VALUES(doctorName),
      doctorSpecialty = VALUES(doctorSpecialty),
      doctorPhone = VALUES(doctorPhone)
  `;

  db.query(
    doctorQuery,
    [doctorID, doctorName, doctorSpecialty, doctorPhone],
    (err, results) => {
      if (err) {
        console.error("Error inserting doctor:", err.message);
        return res.status(500).json({ message: "Failed to add/modify doctor." });
      }

      // Insert full weekly schedule for the doctor (Monday to Friday, 9:00 to 16:00)
      const scheduleQuery = `
        INSERT INTO doctor_schedule (doctor_id, day, time_slot, status)
        VALUES 
        (?, 'Monday', '09:00', 'available'), (?, 'Monday', '10:00', 'available'), (?, 'Monday', '11:00', 'available'),
        (?, 'Monday', '12:00', 'available'), (?, 'Monday', '13:00', 'available'), (?, 'Monday', '14:00', 'available'),
        (?, 'Monday', '15:00', 'available'), (?, 'Monday', '16:00', 'available'),

        (?, 'Tuesday', '09:00', 'available'), (?, 'Tuesday', '10:00', 'available'), (?, 'Tuesday', '11:00', 'available'),
        (?, 'Tuesday', '12:00', 'available'), (?, 'Tuesday', '13:00', 'available'), (?, 'Tuesday', '14:00', 'available'),
        (?, 'Tuesday', '15:00', 'available'), (?, 'Tuesday', '16:00', 'available'),

        (?, 'Wednesday', '09:00', 'available'), (?, 'Wednesday', '10:00', 'available'), (?, 'Wednesday', '11:00', 'available'),
        (?, 'Wednesday', '12:00', 'available'), (?, 'Wednesday', '13:00', 'available'), (?, 'Wednesday', '14:00', 'available'),
        (?, 'Wednesday', '15:00', 'available'), (?, 'Wednesday', '16:00', 'available'),

        (?, 'Thursday', '09:00', 'available'), (?, 'Thursday', '10:00', 'available'), (?, 'Thursday', '11:00', 'available'),
        (?, 'Thursday', '12:00', 'available'), (?, 'Thursday', '13:00', 'available'), (?, 'Thursday', '14:00', 'available'),
        (?, 'Thursday', '15:00', 'available'), (?, 'Thursday', '16:00', 'available'),

        (?, 'Friday', '09:00', 'available'), (?, 'Friday', '10:00', 'available'), (?, 'Friday', '11:00', 'available'),
        (?, 'Friday', '12:00', 'available'), (?, 'Friday', '13:00', 'available'), (?, 'Friday', '14:00', 'available'),
        (?, 'Friday', '15:00', 'available'), (?, 'Friday', '16:00', 'available')
      ON DUPLICATE KEY UPDATE
        status = VALUES(status)
      `;

      const params = Array(40).fill(doctorID); // 40 time slots

      db.query(scheduleQuery, params, (scheduleErr, scheduleResults) => {
        if (scheduleErr) {
          console.error("Error inserting schedule:", scheduleErr.message);
          console.error("Schedule Query Parameters:", params);
          return res.status(500).json({ message: "Failed to add default schedule." });
        }

        console.log("Schedule successfully inserted for doctor:", doctorID);
        res.json({ message: "Doctor added/modified with default schedule." });
      });
    }
  );
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
