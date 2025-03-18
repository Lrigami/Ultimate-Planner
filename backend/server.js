require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const todolistRoutes = require('./routes/todolist.route');
const taskRoutes = require('./routes/tasks.route');
const kanbanRoutes = require('./routes/kanban.route')
// const tagRoutes = require('./routes/tags.route')
const app = express();
const port = process.env.SERV_PORT;

app.use(cors()); 
app.use(express.json());

app.use('/todolist', todolistRoutes);
app.use('/todolist/:tdlid/tasks', taskRoutes);
app.use('/kanban', kanbanRoutes);
// app.use('/tags', tagRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log(`Documentation available on http://localhost:${port}/api/docs`);
});