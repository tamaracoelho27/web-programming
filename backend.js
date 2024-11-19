const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin_system',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Fetch doctors (to populate the dropdown)
app.get('/doctors', (req, res) => {
  const query = 'SELECT doctorID, doctorName, doctorSpecialty FROM doctors';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err.message);
      return res.status(500).json({ message: 'Failed to fetch doctors.' });
    }

    res.json(results); // Send the list of doctors
  });
});

// Fetch timetable for a specific doctor
app.get('/doctors/:doctorID/schedule', (req, res) => {
  const doctorID = req.params.doctorID;
  const query = `
    SELECT day, time_slot, status 
    FROM doctors_schedule 
    WHERE doctor_id = ? 
    ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'), time_slot
  `;
  
  db.query(query, [doctorID], (err, results) => {
    if (err) {
      console.error('Error fetching timetable:', err.message);
      return res.status(500).json({ message: 'Failed to fetch timetable.' });
    }

    res.json(results); // Return the timetable for the doctor
  });
});

// Create or update doctor schedule
app.post('/doctors_schedule', (req, res) => {
  const { doctorID, day, time_slot, status } = req.body;

  const query = `
    INSERT INTO doctors_schedule (doctor_id, day, time_slot, status)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      status = VALUES(status)
  `;

  db.query(query, [doctorID, day, time_slot, status], (err, results) => {
    if (err) {
      console.error('Error updating doctor schedule:', err.message);
      return res.status(500).json({ message: 'Failed to update schedule.' });
    }

    res.json({ message: 'Doctor schedule updated successfully.' });
  });
});

// Create or modify a doctor
app.post('/doctors', (req, res) => {
  const { doctorID, doctorName, doctorSpecialty, doctorPhone } = req.body;

  if (!doctorID || !doctorName || !doctorSpecialty || !doctorPhone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

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
        console.error('Error inserting doctor:', err.message);
        return res.status(500).json({ message: 'Failed to add/modify doctor.' });
      }

      res.json({ message: 'Doctor added/modified successfully.' });
    }
  );
});

// Delete a doctor
app.delete('/doctors/:doctorID', (req, res) => {
  const doctorID = req.params.doctorID;

  const deleteDoctorQuery = 'DELETE FROM doctors WHERE doctorID = ?';

  db.query(deleteDoctorQuery, [doctorID], (err, results) => {
    if (err) {
      console.error('Error deleting doctor:', err.message);
      return res.status(500).json({ message: 'Failed to delete doctor.' });
    }

    if (results.affectedRows > 0) {
      res.json({ message: `Doctor with ID ${doctorID} deleted successfully.` });
    } else {
      res.status(404).json({ message: `Doctor with ID ${doctorID} not found.` });
    }
  });
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
