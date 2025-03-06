// Routes
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks.controller');

router.post('/', taskController.createNewTask);
router.get('/', taskController.readAllTasks);
router.get('/:id', taskController.readOneTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;