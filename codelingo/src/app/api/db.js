'use server';

// Import necessary packages
const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool of connections using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to query the database
function Query(script) {
  return pool.query(script);
}

module.exports = { pool, Query };