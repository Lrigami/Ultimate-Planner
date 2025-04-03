const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// To execute an SQL function
const query = (text, params) => pool.query(text, params);
// text = SQL request
// params = request params (protection against SQL injection)

module.exports = { pool, query };