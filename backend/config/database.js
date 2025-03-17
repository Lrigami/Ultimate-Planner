const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Fonction pour exécuter une requête SQL
const query = (text, params) => pool.query(text, params);
// text = la requête SQL
// params = les paramètres de la requête afin d'empêcher les attaques par injection SQL

module.exports = { query };