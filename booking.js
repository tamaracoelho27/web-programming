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
      `;

      const scheduleParams = Array(40).fill(doctorID); // 40 time slots for each day
       
      db.query(scheduleQuery, scheduleParams, (scheduleErr, scheduleResults) => {
        if (scheduleErr) {
          console.error("Error inserting schedule:", scheduleErr.message);
          return res.status(500).json({ message: "Failed to add schedule." });
        }

        console.log("Doctors and schedule successfully added/modified.");
        res.json({ message: "Doctors added/modified with schedule." });
        
        const scheduleQuery2 = `
        INSERT INTO doctor_schedule (doctorID, day, time_slot, status)
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
      `;
      const scheduleParams = Array(40).fill(doctorID); // 40 time slots for each day
      db.query(scheduleQuery, scheduleParams, (scheduleErr, scheduleResults) => {
        if (scheduleErr) {
          console.error("Error inserting schedule:", scheduleErr.message);
          return res.status(500).json({ message: "Failed to add schedule." });
        }

        console.log("Doctor and schedule successfully added/modified.");
        res.json({ message: "Doctor added/modified with schedule." });
      });
    });
    }
  );
});

// Fetch Doctors by Specialty (Department)
// Fetch Doctors by Specialty (Department)
// Fetch Doctors by Specialty (Department)
// Fetch Doctors by Specialty (Department)
app.get("/doctors", (req, res) => {
    const { specialty } = req.query;
    let query = "SELECT doctorID, doctorName, doctorSpecialty FROM doctors";
    
    if (specialty) {
      query += " WHERE doctorSpecialty = ?";
    }
  
    console.log("Executing query:", query);  // Log the query for debugging
  
    db.query(query, specialty ? [specialty] : [], (err, results) => {
      if (err) {
        console.error("Error fetching doctors:", err.message);
        return res.status(500).json({ message: "Failed to fetch doctors." });
      }
  
      if (results.length === 0) {
        console.log("No doctors found for specialty:", specialty);  // Log if no results found
        return res.json([]);
      }
  
      res.json(results); // Send the list of doctors filtered by specialty
    });
  });  
  

// Fetch Timetable for a Specific Doctor
// Populate the doctors dropdown based on the selected department
// Function to populate doctors based on selected department
async function populateDoctors() {
    const department = document.getElementById("selectDepartment").value;
    const selectDoctor = document.getElementById("selectDoctor");
  
    if (!department) {
      alert("Please select a department.");
      return;
    }
  
    // Clear previous doctors
    selectDoctor.innerHTML = "<option value=''>-- Select a Doctor --</option>";
  
    try {
      // Fetch doctors from the selected department
      const response = await fetch(`http://localhost:3003/doctors?specialty=${encodeURIComponent(department)}`);
      const doctors = await response.json();
  
      // Check if doctors were found
      if (doctors.length === 0) {
        alert("No doctors found for the selected department.");
        return;
      }
  
      // Populate doctor dropdown
      doctors.forEach((doctor) => {
        const option = document.createElement("option");
        option.value = doctor.doctorID;  // Use the doctorID from the backend
        option.textContent = `${doctor.doctorName} - ${doctor.doctorSpecialty}`;
        selectDoctor.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading doctors:", error);
      alert("An error occurred while loading doctors. Please try again.");
    }
  }

  app.get("/doctors/:doctorID/schedule", (req, res) => {
    const doctorID = req.params.doctorID;
    const query = "SELECT * FROM doctors_schedule WHERE doctor_id = ?";
  
    db.query(query, [doctorID], (err, results) => {
      if (err) {
        console.error("Error fetching schedule:", err.message);
        return res.status(500).json({ message: "Failed to fetch schedule." });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No schedule found for this doctor." });
      }
  
      res.json(results); // Send the schedule as a JSON response
    });
  });
  
  
  
  
  

// Create Appointment (Book Appointment)
app.post("/appointments", (req, res) => {
  const { doctorID, day, timeSlot } = req.body;

  if (!doctorID || !day || !timeSlot) {
    return res.status(400).json({ message: "All fields are required to book an appointment." });
  }

  // Insert appointment into database
  const query = "INSERT INTO appointments (doctorID, day, time_slot) VALUES (?, ?, ?)";

  db.query(query, [doctorID, day, timeSlot], (err, result) => {
    if (err) {
      console.error("Error booking appointment:", err.message);
      return res.status(500).json({ message: "Failed to book appointment." });
    }
    res.json({ message: "Appointment booked successfully!" });
  });
});

// Mark schedule as booked (unavailable)
app.post("/doctors/schedule/book", (req, res) => {
    const { scheduleID, status } = req.body;
  
    if (!scheduleID || !status) {
      return res.status(400).json({ message: "Missing schedule ID or status." });
    }
  
    const query = "UPDATE doctors_schedule SET status = ? id = ?";
    
    db.query(query, [status, scheduleID], (err, result) => {
      if (err) {
        console.error("Error updating schedule status:", err.message);
        return res.status(500).json({ message: "Failed to update schedule." });
      }
  
      res.json({ message: "Appointment booked successfully!" });
    });
  });
  
  // Cancel schedule (mark as available)
  app.post("/doctors/schedule/cancel", (req, res) => {
    const { scheduleID, status } = req.body;
  
    if (!scheduleID || !status) {
      return res.status(400).json({ message: "Missing schedule ID or status." });
    }
  
    const query = "UPDATE doctors_schedule SET status = ? WHERE id = ?";
    
    db.query(query, [status, scheduleID], (err, result) => {
      if (err) {
        console.error("Error updating schedule status:", err.message);
        return res.status(500).json({ message: "Failed to update schedule." });
      }
  
      res.json({ message: "Appointment cancelled successfully!" });
    });
  });
  

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
