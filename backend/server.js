require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();
const port = process.env.SERV_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const todolistRoutes = require('./routes/todolist.route');
const taskRoutes = require('./routes/tasks.route');
const enumsRoutes = require('./routes/enums.route')
// const tagRoutes = require('./routes/tags.route')

app.use('/todolist', todolistRoutes);
app.use('/todolist/:tdlid/tasks', taskRoutes);
app.use('/enums', enumsRoutes);
// app.use('/tags', tagRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log(`Documentation available on http://localhost:${port}/api/docs`);
});