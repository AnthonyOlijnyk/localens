const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config(); // If you are using dotenv to manage your environment variables

// Set up PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/SignUpView', async (req, res) => {
  try {
    const { fullName, userName, phoneNumber, email, password } = req.body;

    // Validation (simplified for example purposes)
    if (!fullName || !userName || !email || !password) {
      return res.status(400).send('Missing required fields');
    }

    // Check for existing user
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).send('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (full_name, username, phone_number, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fullName, userName, phoneNumber, email, hashedPassword]
    );

    // Return the new user (excluding password)
    const { password: _, ...userData } = newUser.rows[0];
    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
