require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { query } = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();
const port = process.env.SERV_PORT;
const authenticateToken = require('./middlewares/auth.middleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const authRoutes = require('./routes/sign-in-up.route');
const todolistRoutes = require('./routes/todolist.route');
const taskRoutes = require('./routes/tasks.route');
const enumsRoutes = require('./routes/enums.route')
// const tagRoutes = require('./routes/tags.route')

app.use('/auth', authRoutes);
app.use('/todolist', authenticateToken, todolistRoutes);
app.use('/todolist/:tdlid/tasks', authenticateToken, taskRoutes);
app.use('/enums', authenticateToken, enumsRoutes);
// app.use('/tags', tagRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log(`Documentation available on http://localhost:${port}/api/docs`);
});