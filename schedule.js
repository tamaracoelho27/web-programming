const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'hospital_system', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Fetch all doctors
app.get('/doctors', (req, res) => {
    const query = 'SELECT doctorID, doctorName, doctorSpecialty FROM doctors';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            res.status(500).send('Error fetching doctors');
        } else {
            res.json(results);
        }
    });
});

// Fetch timetable for a specific doctor
app.get('/schedule/:doctorID', (req, res) => {
    const { doctorID } = req.params;

    const query = `
        SELECT day, time_slot, status
        FROM doctor_schedule
        WHERE doctor_id = ?
        ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), time_slot
    `;

    db.query(query, [doctorID], (err, results) => {
        if (err) {
            console.error('Error fetching schedule:', err.message);
            return res.status(500).json({ message: 'Failed to fetch schedule.' });
        }

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

        const fullSchedule = [];
        days.forEach(day => {
            timeSlots.forEach(timeSlot => {
                const existingSlot = results.find(slot => slot.day === day && slot.time_slot === timeSlot);
                if (existingSlot) {
                    fullSchedule.push(existingSlot);
                } else {
                    fullSchedule.push({
                        doctor_id: doctorID,
                        day,
                        time_slot: timeSlot,
                        status: 'available',
                    });
                }
            });
        });

        // If the schedule is empty, insert the default timetable into the database
        if (results.length === 0) {
            const insertQuery = `
                INSERT INTO doctor_schedule (doctor_id, day, time_slot, status)
                VALUES ?
            `;

            const defaultTimetable = fullSchedule.map(slot => [slot.doctor_id, slot.day, slot.time_slot, slot.status]);

            db.query(insertQuery, [defaultTimetable], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting default schedule:', insertErr.message);
                    return res.status(500).json({ message: 'Failed to create default schedule.' });
                }

                console.log('Default schedule created for doctor:', doctorID);
                res.json(fullSchedule); // Send the default timetable back to the client
            });
        } else {
            res.json(fullSchedule); // Send the existing timetable back to the client
        }
    });
});

// Update a specific slot for a doctor
app.post('/schedule/update', (req, res) => {
    const { doctor_id, day, time_slot, status } = req.body;

    const query = `
        UPDATE doctor_schedule
        SET status = ?
        WHERE doctor_id = ? AND day = ? AND time_slot = ?
    `;

    db.query(query, [status, doctor_id, day, time_slot], (err) => {
        if (err) {
            console.error('Error updating schedule:', err.message);
            return res.status(500).json({ message: 'Failed to update schedule.' });
        }

        res.json({ message: 'Slot updated successfully.' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
