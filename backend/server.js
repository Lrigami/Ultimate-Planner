require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const taskRoutes = require('./routes/tasks.route');
const app = express();
const port = process.env.PORT;

app.use(cors()); 
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log(`Documentation available on http://localhost:${port}/api/docs`);
});