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
  database: "admin_system",
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
        INSERT INTO doctors_schedule (doctor_id, day, time_slot, status)
        VALUES 
        (?, 'Monday', '09:00', 'available'), (?, 'Monday', '10:00', 'available'),
        (?, 'Monday', '11:00', 'available'),
        (?, 'Tuesday', '09:00', 'available'), (?, 'Tuesday', '10:00', 'available'),
        (?, 'Tuesday', '11:00', 'available'),
        (?, 'Wednesday', '09:00', 'available'), (?, 'Wednesday', '10:00', 'available'),
        (?, 'Wednesday', '11:00', 'available'),
        (?, 'Thursday', '09:00', 'available'), (?, 'Thursday', '10:00', 'available'),
        (?, 'Thursday', '11:00', 'available'),
        (?, 'Friday', '09:00', 'available'), (?, 'Friday', '10:00', 'available'),
        (?, 'Friday', '11:00', 'available')
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
app.get("/doctors", (req, res) => {
  const query = "SELECT doctorID, doctorName, doctorSpecialty FROM doctors";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching doctors:", err.message);
      return res.status(500).json({ message: "Failed to fetch doctors." });
    }
    res.json(results); // Send the list of doctors
  });
});

// Fetch doctor by ID
app.get("/doctors/:doctorID", (req, res) => {
  const doctorID = req.params.doctorID;
  const query = "SELECT * FROM doctors WHERE doctorID = ?";
  db.query(query, [doctorID], (err, results) => {
    if (err) {
      console.error("Error fetching doctor:", err);
      res.status(500).send({ message: "Failed to fetch doctor." });
    } else {
      res.json(results[0]); // Return the first match
    }
  });
});
app.delete('/doctors/:doctorID', (req, res) => {
  const { doctorID } = req.params;

  const deleteDoctorQuery = "DELETE FROM doctors WHERE doctorID = ?";

  db.query(deleteDoctorQuery, [doctorID], (err, results) => {
    if (err) {
      console.error("Error deleting doctor:", err.message);
      return res.status(500).json({ message: "Failed to delete doctor." });
    }

    if (results.affectedRows > 0) {
      res.json({ message: "Doctor with ID ${doctorID} deleted successfully." });
    } else {
      res.status(404).json({ message: "Doctor with ID ${doctorID} not found." });
    }
  });
});

  



// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
