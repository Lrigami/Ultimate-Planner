require("dotenv").config();
const express = require('express');
const pool = require('./config/database');

const app = express();
const port = process.env.PORT;

// test de la base de données
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW();'); // simple requête pour tester la base de données
        res.json({ success: true, time: result.rows[0] });
    } catch(err) {
        console.error('Erreur de connexion à la base de données : ', err);
        res.status(500).json({ success: false, error: err.message });
    }
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});