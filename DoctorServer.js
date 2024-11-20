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

// Add or Modify a Doctor and their Schedule
app.post("/doctors", (req, res) => {
  const { doctorID, doctorName, doctorSpecialty, doctorPhone } = req.body;

  if (!doctorID || !doctorName || !doctorSpecialty || !doctorPhone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert or update the doctor in the `doctors` table
  const doctorQuery = `
    INSERT INTO doctors (doctorID, doctorName, doctorSpecialty, doctorPhone)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      doctorName = VALUES(doctorName),
      doctorSpecialty = VALUES(doctorSpecialty),
      doctorPhone = VALUES(doctorPhone)
  `;

  db.query(doctorQuery, [doctorID, doctorName, doctorSpecialty, doctorPhone], (err) => {
    if (err) {
      console.error("Error inserting doctor:", err.message);
      return res.status(500).json({ message: "Failed to add/modify doctor." });
    }

    // Default schedule for the doctor
    const defaultSchedule = [
      ["Monday", "09:00"], ["Monday", "10:00"], ["Monday", "11:00"],
      ["Tuesday", "09:00"], ["Tuesday", "10:00"], ["Tuesday", "11:00"],
      ["Wednesday", "09:00"], ["Wednesday", "10:00"], ["Wednesday", "11:00"],
      ["Thursday", "09:00"], ["Thursday", "10:00"], ["Thursday", "11:00"],
      ["Friday", "09:00"], ["Friday", "10:00"], ["Friday", "11:00"]
    ];

    const doctorScheduleParams = defaultSchedule.map(([day, time]) => [doctorID, day, time, "available"]);
    const doctorsScheduleParams = defaultSchedule.map(([day, time]) => [doctorID, day, time, "available"]);

    // Insert or update schedule in `doctor_schedule`
    const insertDoctorScheduleQuery = `
      INSERT INTO doctor_schedule (doctorID, day, time_slot, status)
      VALUES ?
      ON DUPLICATE KEY UPDATE status = VALUES(status)
    `;

    db.query(insertDoctorScheduleQuery, [doctorScheduleParams], (err) => {
      if (err) {
        console.error("Error inserting into doctor_schedule:", err.message);
        return res.status(500).json({ message: "Failed to add schedule to doctor_schedule." });
      }

      // Insert or update schedule in `doctors_schedule`
      const insertDoctorsScheduleQuery = `
        INSERT INTO doctors_schedule (doctor_id, day, time_slot, status)
        VALUES ?
        ON DUPLICATE KEY UPDATE status = VALUES(status)
      `;

      db.query(insertDoctorsScheduleQuery, [doctorsScheduleParams], (err) => {
        if (err) {
          console.error("Error inserting into doctors_schedule:", err.message);
          return res.status(500).json({ message: "Failed to add schedule to doctors_schedule." });
        }

        res.json({ message: "Doctor and schedules successfully added/modified." });
      });
    });
  });
});

// Fetch all doctors
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
      console.error("Error fetching doctor:", err.message);
      return res.status(500).json({ message: "Failed to fetch doctor." });
    }
    res.json(results[0]); // Return the first match
  });
});

// Delete a doctor
app.delete("/doctors/:doctorID", (req, res) => {
  const doctorID = req.params.doctorID;

  const deleteDoctorQuery = "DELETE FROM doctors WHERE doctorID = ?";

  db.query(deleteDoctorQuery, [doctorID], (err, results) => {
    if (err) {
      console.error("Error deleting doctor:", err.message);
      return res.status(500).json({ message: "Failed to delete doctor." });
    }

    if (results.affectedRows > 0) {
      res.json({ message: `Doctor with ID ${doctorID} deleted successfully.` });
    } else {
      res.status(404).json({ message: `Doctor with ID ${doctorID} not found.` });
    }
  });
});

// Fetch schedule for a doctor
app.get("/doctors/:doctorID/schedule", (req, res) => {
  const doctorID = req.params.doctorID;
  const query = "SELECT * FROM doctor_schedule WHERE doctorID = ?";

  db.query(query, [doctorID], (err, results) => {
    if (err) {
      console.error("Error fetching schedule:", err.message);
      return res.status(500).json({ message: "Failed to fetch schedule." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No schedule found for this doctor." });
    }

    res.json(results); // Return the schedule as JSON
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
