// Routes
const express = require('express');
const router = express.Router({ mergeParams: true});
const taskController = require('../controllers/tasks.controller');

// Tasks routes
router.post('/', taskController.createNewTask); // Create a new task in db
router.get('/', taskController.readAllTasks); // Get all tasks from a given to-do list
router.get('/:id', taskController.readOneTask); // Get a single task by id
router.put('/:id', taskController.updateTask); // Update a task data
router.delete('/:id', taskController.deleteTask); // Delete a task by id
router.post('/filter', taskController.filterTasks); // Filter tasks 
router.post('/sortOrder', taskController.sortTaskOrder); // Update tasks sorting order after user's drag'n drop

module.exports = router;