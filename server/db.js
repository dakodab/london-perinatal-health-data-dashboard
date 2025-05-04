const mysql = require('mysql2');
require('dotenv').config(); // <-- Make sure .env loads here too ("environment variables" - secret configuration values like password, keys, etc.)

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10, // arbitrary - could change //
  queueLimit: 0
});

module.exports = pool; // removed .promise()