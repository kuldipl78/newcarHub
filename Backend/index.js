const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Load env variables
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());
    app.use(cors());

    let db;

    // ================= Database ==================
    const dbConnection = async () => {
        try {
            db = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            console.log(`✅ Connected to MySQL Database on Worker ${process.pid}`);

            app.listen(PORT, () => {
                console.log(`🚀 Worker ${process.pid} running on http://localhost:${PORT}`);
            });
        } catch (error) {
            console.error(`❌ Database Connection Error: ${error.message}`);
        }
    };
    dbConnection();

    // =============== Middleware ==================
    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return res.status(401).send("Access denied");

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send("Invalid or expired token");
            req.user = user;
            next();
        });
    };



    app.post("/login/", async (request, response) => {
        const { phone_number, email } = request.body;

        try {
            let user;
            if (phone_number) {
                const sqlQuery = `SELECT * FROM users WHERE phone_number = ?`;
                const [rows] = await db.execute(sqlQuery, [phone_number]);
                user = rows[0];
            } else if (email) {
                const sqlQuery = `SELECT * FROM users WHERE email = ?`;
                const [rows] = await db.execute(sqlQuery, [email]);
                user = rows[0];
            } else {
                return response.status(400).send('Phone number or email is required');
            }

            if (user) {
            const token = jwt.sign(
                { id: user.id, phone_number: user.phone_number }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );
        // ✅ Send token in response
                response.status(200).json({
                    otp: 123456, // static OTP for demo
                    message: "Login successful",
                    token: token,   // sending JWT
                    user: {
                        id: user.id,
                        phone_number: user.phone_number
                    }
                });

                
            } else {
                response.status(401).send('Invalid phone number or email');
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
            response.status(500).send('Internal Server Error');
        }


    });
    // Verify OTP -> Issue JWT
    app.post("/verify-otp", async (req, res) => {
        const { phone_number, otp } = req.body;

        try {
            if (!phone_number || !otp) {
                return res.status(400).send("Phone number and OTP are required");
            }

            if (otp !== "866832") {
                return res.status(401).send("Invalid OTP");
            }

            const token = jwt.sign({ phone_number }, JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ message: "OTP verified successfully", token });
        } catch (error) {
            console.error("Error verifying OTP:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    // Example Protected Profile Route
    app.get("/profile", authenticateToken, (req, res) => {
        res.json({ message: "Welcome to your profile", user: req.user });
    });

    // =============== Business Routes ===============

    // Register user
    app.post('/register', async (request, response) => {
        const { email, name, address, gender, phone_number } = request.body;
        try {
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phone_number)) {
                return response.status(400).send('Invalid phone number: only digits are allowed');
            }

            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(name)) {
                return response.status(400).send('Invalid name: only letters and spaces are allowed');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return response.status(400).send('Invalid email format');
            }

            const sqlQueryForNumber = `SELECT * FROM users WHERE phone_number=?`;
            const sqlQueryForEmail = `SELECT * FROM users WHERE email=?`;
            const [number_check] = await db.execute(sqlQueryForNumber, [phone_number]);
            const [email_check] = await db.execute(sqlQueryForEmail, [email]);

            if (number_check.length > 0) {
                return response.status(400).send('User Mobile Number already exists');
            }
            if (email_check.length > 0) {
                return response.status(400).send('User Email already exists');
            }

            if (phone_number.length !== 10) {
                return response.status(400).send('Invalid phone number');
            }

            const query = `INSERT INTO users (email, name, address, gender, phone_number) VALUES (?, ?, ?, ?, ?)`;
            await db.execute(query, [email, name, address, gender, phone_number]);
            response.send('User created successfully');

        } catch (error) {
            console.log(`Error: ${error.message}`);
            response.status(500).send('Internal Server Error');
        }
    });

    // Book service (protected)
    app.post('/book_service', authenticateToken, async (req, res) => {
        const {
            customer_name,
            vehicle_name,
            vehicle_number,
            mobile_number,
            booking_date,
            service_type,
            work_details
        } = req.body;

        try {
            if (!customer_name || !vehicle_name || !vehicle_number || !mobile_number || !booking_date || !service_type) {
                return res.status(400).send('All fields except work details are required');
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(mobile_number)) {
                return res.status(400).send('Invalid mobile number (must be 10 digits)');
            }

            const validServices = ['exterior', 'interior', 'wax'];
            if (!validServices.includes(service_type)) {
                return res.status(400).send('Invalid service type');
            }

            const id = uuidv4();

            const query = `
                INSERT INTO bookings 
                (id, customer_name, vehicle_name, vehicle_number, mobile_number, booking_date, service_type, work_details) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            await db.execute(query, [
                id,
                customer_name,
                vehicle_name,
                vehicle_number,
                mobile_number,
                booking_date,
                service_type,
                work_details || null
            ]);

            res.status(201).send({ message: 'Booking added successfully', booking_id: id });

        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Services (open routes)
    app.get('/services', async (req, res) => {
        try {
            const [rows] = await db.execute(`SELECT * FROM car_services ORDER BY time DESC`);
            res.status(200).json(rows);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    });

    app.get('/services/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await db.execute(`SELECT * FROM car_services WHERE id = ?`, [id]);
            if (rows.length === 0) return res.status(404).send('Service not found');
            res.status(200).json(rows[0]);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    });

    app.put('/services/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
        const { customer, vehicle, service, status, staff, urgent } = req.body;

        try {
            const query = `
                UPDATE car_services 
                SET customer = ?, vehicle = ?, service = ?, status = ?, staff = ?, urgent = ?
                WHERE id = ?
            `;
            await db.execute(query, [customer, vehicle, service, status, staff, urgent, id]);
            res.status(200).send({ message: 'Service updated successfully' });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    });

    app.delete('/services/:id', authenticateToken, async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute(`DELETE FROM car_services WHERE id = ?`, [id]);
            res.status(200).send({ message: 'Service deleted successfully' });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
        }
    });

    // Reviews (protected add, open read)
    app.post("/reviews", authenticateToken, async (req, res) => {
        const { customer_name, car_model, rating, comment } = req.body;

        try {
            const sql = `INSERT INTO reviews (customer_name, car_model, rating, comment) VALUES (?, ?, ?, ?)`;

            await db.execute(sql, [customer_name, car_model, rating, comment]);

            res.status(200).json({ message: "Review added successfully" });
        } catch (error) {
            console.error("Error inserting review:", error);
            res.status(500).json({ error: "Server error" });
        }
    });

    app.get("/reviews", async (req, res) => {
        try {
            const sql = "SELECT * FROM reviews WHERE rating >= ?";
            const [rows] = await db.execute(sql, [4]);
            res.status(200).json(rows);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            res.status(500).json({ error: "Server error" });
        }
    });

    // Contact Us (protected)
    app.post("/contact", authenticateToken, async (req, res) => {
        const { name, phone_number, email, message } = req.body;

        try {
            if (!name || !phone_number || !email) {
                return res.status(400).json({ error: "Name, phone number, and email are required" });
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone_number)) {
                return res.status(400).json({ error: "Invalid phone number (must be 10 digits)" });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            const sql = `INSERT INTO contact_messages (name, phone_number, email, message) VALUES (?, ?, ?, ?)`;
            await db.execute(sql, [name, phone_number, email, message || null]);

            res.status(201).json({ message: "*Thanx For for the information Our Team will Contact You...!" });
        } catch (error) {
            console.error("Error inserting contact message:", error);
            res.status(500).json({ error: "Server error" });
        }
    });
}